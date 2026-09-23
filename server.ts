import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Telegram Config (strictly on server)
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8528130065:AAGYvQfIM0BVm5mq5rkmwvmHNjiZXlN4CHY';
let TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

// Ensure data and uploads directory exist
const DATA_DIR = path.resolve(__dirname, 'data');
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}_${sanitizedName}`);
  }
});

// Video validation: up to 100MB, common video mime types
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedMime = [
      'video/mp4',
      'video/quicktime',
      'video/webm',
      'video/x-matroska',
      'video/avi',
      'video/x-msvideo',
      'video/mpeg',
      'application/octet-stream'
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v'];

    if (allowedMime.includes(file.mimetype) || allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type (${file.mimetype}). Please upload an MP4, MOV, WEBM, or MKV video.`));
    }
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper: Read orders table
interface OrderRecord {
  id: string;
  name: string;
  contact: string;
  edit_type: string;
  edit_style: string;
  minutes: number;
  total_price_mmk: number;
  description: string;
  file_reference: string;
  file_size: number;
  file_path: string;
  telegram_status: 'sent' | 'pending_chat_id' | 'failed' | 'simulated';
  telegram_message_id?: number;
  telegram_error?: string;
  timestamp: string;
}

function getOrders(): OrderRecord[] {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveOrder(order: OrderRecord) {
  const orders = getOrders();
  orders.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// Auto-detect Telegram Chat ID if not explicitly provided
async function getActiveTelegramChatId(): Promise<{ chatId: string | null; botUser?: string }> {
  if (TELEGRAM_CHAT_ID) {
    return { chatId: TELEGRAM_CHAT_ID };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const data = await res.json();
    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      // Find the latest update that has a chat ID
      for (let i = data.result.length - 1; i >= 0; i--) {
        const item = data.result[i];
        const chat = item.message?.chat || item.edited_message?.chat || item.channel_post?.chat || item.my_chat_member?.chat;
        if (chat && chat.id) {
          TELEGRAM_CHAT_ID = String(chat.id);
          return { chatId: TELEGRAM_CHAT_ID };
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch Telegram updates:', err);
  }

  return { chatId: null };
}

// Telegram Forwarding Logic
async function forwardOrderToTelegram(order: OrderRecord, filePath?: string): Promise<{ success: boolean; error?: string; chatId?: string }> {
  if (!TELEGRAM_BOT_TOKEN) {
    return { success: false, error: 'Telegram Bot Token not configured on server.' };
  }

  // Resolve chat ID
  const { chatId } = await getActiveTelegramChatId();
  if (!chatId) {
    return {
      success: false,
      error: 'No active chat ID found. Please send a message (like /start) to the bot on Telegram to initialize.'
    };
  }

  const captionText = [
    `🎬 <b>CUT AGENCY — NEW PRODUCTION ORDER</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Client:</b> ${escapeHtml(order.name)}`,
    `📱 <b>Contact:</b> ${escapeHtml(order.contact)}`,
    `⏱ <b>Duration:</b> ${order.minutes} min`,
    `💰 <b>Total Rate:</b> ${order.total_price_mmk.toLocaleString()} MMK`,
    `✂️ <b>Edit Scope:</b> ${escapeHtml(order.edit_type)}`,
    `🎨 <b>Style / Vibe:</b> ${escapeHtml(order.edit_style)}`,
    ``,
    `📝 <b>Project Brief:</b>`,
    `${escapeHtml(order.description || 'No additional notes provided.')}`,
    ``,
    `📁 <b>Asset Attached:</b> ${escapeHtml(order.file_reference || 'None')}`,
    `📦 <b>Size:</b> ${(order.file_size / (1024 * 1024)).toFixed(2)} MB`,
    `🆔 <b>Order ID:</b> <code>${order.id}</code>`,
    `🕒 <b>Timestamp:</b> ${new Date(order.timestamp).toUTCString()}`
  ].join('\n');

  try {
    // If a video file is attached and under 50MB (standard Telegram Bot send limit)
    if (filePath && fs.existsSync(filePath) && order.file_size > 0 && order.file_size <= 50 * 1024 * 1024) {
      const fileBuffer = fs.readFileSync(filePath);
      const blob = new Blob([fileBuffer]);
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('video', blob, order.file_reference);
      formData.append('caption', captionText);
      formData.append('parse_mode', 'HTML');

      const videoRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`, {
        method: 'POST',
        body: formData
      });
      const videoData = await videoRes.json();

      if (videoData.ok) {
        return { success: true, chatId };
      }
      if (videoData.description && videoData.description.includes('chat not found')) {
        TELEGRAM_CHAT_ID = '';
      }

      // If sendVideo fails (e.g. format constraint), fallback to sendDocument
      const docFormData = new FormData();
      docFormData.append('chat_id', chatId);
      docFormData.append('document', blob, order.file_reference);
      docFormData.append('caption', captionText);
      docFormData.append('parse_mode', 'HTML');

      const docRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: docFormData
      });
      const docData = await docRes.json();
      if (docData.ok) {
        return { success: true, chatId };
      }
    }

    // Fallback or large file: send rich HTML message
    const msgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: captionText,
        parse_mode: 'HTML'
      })
    });
    const msgData = await msgRes.json();

    if (msgData.ok) {
      return { success: true, chatId };
    } else {
      if (msgData.description && msgData.description.includes('chat not found')) {
        TELEGRAM_CHAT_ID = '';
      }
      return { success: false, error: msgData.description || 'Telegram sendMessage rejected' };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Telegram network exception' };
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ----------------- API Endpoints ----------------- //

// Check Telegram bot status & info
app.get('/api/telegram-status', async (_req, res) => {
  try {
    const meRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const meData = await meRes.json();
    const { chatId } = await getActiveTelegramChatId();

    res.json({
      connected: meData.ok,
      bot: meData.result || null,
      activeChatId: chatId || null,
      message: chatId
        ? `Bot is linked to chat ID ${chatId}`
        : `Bot is ready. If chat ID is empty, send a message or /start to @${meData.result?.username || 'bot'}`
    });
  } catch (err: any) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

// Get all orders (database table view)
app.get('/api/orders', (_req, res) => {
  const orders = getOrders();
  res.json({ success: true, orders, count: orders.length });
});

// Order Submission Endpoint
app.post('/api/orders', (req, res) => {
  upload.single('video')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { name, contact, edit_type, edit_style, minutes, description } = req.body;

      if (!name || !contact) {
        return res.status(400).json({ success: false, error: 'Name and contact are required.' });
      }

      const numMinutes = Math.max(1, parseFloat(minutes) || 1);
      const ratePerMinute = 30000; // 30,000 MMK per minute
      const totalPrice = Math.round(numMinutes * ratePerMinute);

      const orderId = `CUT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      const file = req.file;

      const orderRecord: OrderRecord = {
        id: orderId,
        name: String(name).trim(),
        contact: String(contact).trim(),
        edit_type: String(edit_type || 'Full Video Edit').trim(),
        edit_style: String(edit_style || 'Apple iOS 26 Liquid Glass').trim(),
        minutes: numMinutes,
        total_price_mmk: totalPrice,
        description: String(description || '').trim(),
        file_reference: file ? file.originalname : 'No file uploaded',
        file_size: file ? file.size : 0,
        file_path: file ? file.path : '',
        telegram_status: 'pending_chat_id',
        timestamp: new Date().toISOString()
      };

      // Forward to Telegram bot
      const tgResult = await forwardOrderToTelegram(orderRecord, file?.path);
      if (tgResult.success) {
        orderRecord.telegram_status = 'sent';
      } else {
        orderRecord.telegram_status = 'pending_chat_id';
        orderRecord.telegram_error = tgResult.error;
      }

      // Save order to persistent Supabase-compatible store
      saveOrder(orderRecord);

      return res.status(201).json({
        success: true,
        order: orderRecord,
        telegramSent: tgResult.success,
        telegramNotice: tgResult.success
          ? 'Forwarded directly to Telegram bot studio channel.'
          : (tgResult.error || 'Saved to database. Telegram link pending /start message to bot.')
      });
    } catch (submitErr: any) {
      console.error('Order submission error:', submitErr);
      return res.status(500).json({ success: false, error: submitErr.message || 'Internal server error' });
    }
  });
});

// Start Express server and mount Vite
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cut Agency server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
