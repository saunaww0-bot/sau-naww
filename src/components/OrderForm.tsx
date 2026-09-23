import React, { useState, useRef, useEffect } from 'react';
import { Upload, Film, CheckCircle2, AlertCircle, Loader2, Sparkles, Shield, Send, ArrowRight } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderFormProps {
  initialMinutes?: number;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ initialMinutes = 3, onOrderSuccess }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [editType, setEditType] = useState('Full Video Edit & Sound');
  const [editStyle, setEditStyle] = useState('Apple iOS 26 Liquid Glass (Monochrome)');
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileDragActive, setFileDragActive] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);
  const [telegramNotice, setTelegramNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if initialMinutes changes externally from the calculator
  useEffect(() => {
    if (initialMinutes > 0) {
      setMinutes(initialMinutes);
    }
  }, [initialMinutes]);

  const RATE_PER_MINUTE = 30000;
  const totalPrice = Math.round(minutes * RATE_PER_MINUTE);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validExtensions = ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v'];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext));
    const isVideoMime = selectedFile.type.startsWith('video/') || selectedFile.type === '';

    if (!hasValidExt && !isVideoMime) {
      setErrorMessage('Please upload a standard video file (MP4, MOV, WEBM, or MKV).');
      return;
    }

    // 100MB limit check
    if (selectedFile.size > 100 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 100MB direct upload limit. For massive raw camera bins, please provide a drive link in the brief.');
      return;
    }

    setErrorMessage(null);
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name or company identifier.');
      return;
    }
    if (!contact.trim()) {
      setErrorMessage('Please provide your Telegram handle, phone, or email.');
      return;
    }
    if (!file) {
      setErrorMessage('Please attach your video footage (or a demo clip) for evaluation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('contact', contact.trim());
      formData.append('edit_type', editType);
      formData.append('edit_style', editStyle);
      formData.append('minutes', String(minutes));
      formData.append('description', description.trim());
      if (file) {
        formData.append('video', file);
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit order to server.');
      }

      setSubmittedOrder(data.order);
      setTelegramNotice(data.telegramNotice || null);
      onOrderSuccess(data.order);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during production submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedOrder(null);
    setFile(null);
    setDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="order" className="py-24 md:py-32 px-6 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-4 font-medium">
            <span>Direct Intake</span>
            <span aria-hidden="true">·</span>
            <span>Server-Encrypted Dispatch</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Initiate production order.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Upload your footage, set your stylistic parameters, and confirm your runtime. Submissions are processed by our backend engine and instantaneously forwarded to our studio master Telegram channel.
          </p>
        </div>

        {submittedOrder ? (
          /* Submission Receipt / Confirmation View */
          <div className="max-w-3xl mx-auto liquid-glass-surface rounded-3xl p-8 sm:p-12 relative border border-white/25 shadow-2xl">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  Production Order Dispatched
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Reference: <span className="text-white">{submittedOrder.id}</span>
                </p>
              </div>
            </div>

            {/* Telegram Transmission Status Badge */}
            <div className="liquid-glass-subtle rounded-2xl p-5 mb-8 border border-white/10 flex items-start gap-3">
              <Send className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-white font-medium mb-1">
                  Telegram Bot API Dispatch Status
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                  {telegramNotice || 'Payload transmitted to studio direct pipeline.'}
                </p>
                <div className="text-[11px] text-neutral-500 mt-2 font-mono">
                  Delivery Status: <span className="text-white uppercase font-bold">{submittedOrder.telegram_status}</span>
                </div>
              </div>
            </div>

            {/* Order Ledger */}
            <div className="space-y-3 py-6 border-y border-white/[0.08] mb-8 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Client Name:</span>
                <span className="text-white">{submittedOrder.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Direct Contact:</span>
                <span className="text-white">{submittedOrder.contact}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Edit Scope:</span>
                <span className="text-white">{submittedOrder.edit_type}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Aesthetic Style:</span>
                <span className="text-white">{submittedOrder.edit_style}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Duration / Rate:</span>
                <span className="text-white">{submittedOrder.minutes} Min @ 30,000 MMK/Min</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Uploaded Video File:</span>
                <span className="text-white truncate max-w-[200px] sm:max-w-xs">{submittedOrder.file_reference}</span>
              </div>
              <div className="flex justify-between text-neutral-400 pt-3 border-t border-white/[0.04] text-sm font-semibold">
                <span className="text-neutral-300">Total Investment:</span>
                <span className="text-white">{submittedOrder.total_price_mmk.toLocaleString()} MMK</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
              >
                Submit Another Project
              </button>
              <a
                href="https://t.me/CutAgencyBot"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-all text-center"
              >
                Open Studio Telegram Bot
              </a>
            </div>
          </div>
        ) : (
          /* Active Intake Form */
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto liquid-glass-surface rounded-3xl p-8 sm:p-12 relative">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {errorMessage && (
              <div className="mb-8 p-4 rounded-2xl bg-neutral-900 border border-white/20 text-xs text-neutral-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            <div className="space-y-8">
              {/* Row 1: Client Name & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client-name" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Name / Brand Entity <span className="text-white">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance or Veloce Labs"
                    className="w-full px-4 py-3.5 rounded-xl liquid-glass-subtle border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="client-contact" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Direct Contact (Telegram / Phone / Email) <span className="text-white">*</span>
                  </label>
                  <input
                    id="client-contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="@telegram_handle or +95 9... or user@domain.com"
                    className="w-full px-4 py-3.5 rounded-xl liquid-glass-subtle border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Video Upload Box (Drag and Drop) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Source Video Upload <span className="text-white">*</span>
                </label>

                <div
                  onDragOver={(e) => { e.preventDefault(); setFileDragActive(true); }}
                  onDragLeave={() => setFileDragActive(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer ${
                    fileDragActive
                      ? 'border-white bg-white/10'
                      : file
                      ? 'border-white/40 bg-white/[0.04]'
                      : 'border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.03]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm,video/x-matroska,.mov,.mp4,.webm,.mkv"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3">
                        <Film className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-white truncate max-w-sm">
                        {file.name}
                      </div>
                      <div className="text-xs font-mono text-neutral-400 mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for Server Bot Dispatch
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="mt-3 text-xs text-neutral-400 hover:text-white underline"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full liquid-glass-subtle flex items-center justify-center mb-3">
                        <Upload className="w-5 h-5 text-neutral-300" />
                      </div>
                      <div className="text-sm font-medium text-white mb-1">
                        Drag and drop your raw video, or browse files
                      </div>
                      <div className="text-xs text-neutral-400">
                        Accepts MP4, MOV (ProRes/H.264/H.265), WEBM, MKV · Up to 100MB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: What they want edited & Style Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="edit-type" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    What You Want Edited
                  </label>
                  <select
                    id="edit-type"
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl liquid-glass-subtle border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors bg-neutral-950 cursor-pointer"
                  >
                    <option value="Full Video Edit & Sound">Full Video Edit & Sound (All-in-One)</option>
                    <option value="Color Grading Only">Color Grading Only (Monochrome Master)</option>
                    <option value="UI Screen Polish & Liquid Glass">UI Screen Polish & Liquid Glass Overlays</option>
                    <option value="Motion Graphics & Kinetic Typography">Motion Graphics & Kinetic Typography</option>
                    <option value="Tactile Sound Design & Mastering">Tactile Sound Design & Spatial Audio</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-style" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                    Aesthetic / Style Preference
                  </label>
                  <select
                    id="edit-style"
                    value={editStyle}
                    onChange={(e) => setEditStyle(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl liquid-glass-subtle border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors bg-neutral-950 cursor-pointer"
                  >
                    <option value="Apple iOS 26 Liquid Glass (Monochrome)">Apple iOS 26 Liquid Glass (Monochrome)</option>
                    <option value="High-Contrast Obsidian Noir">High-Contrast Obsidian Noir</option>
                    <option value="Nordic Architectural Minimalist">Nordic Architectural Minimalist</option>
                    <option value="Keynote Silicon Valley Launch">Keynote Silicon Valley Launch</option>
                    <option value="Fast-Cut Kinetic Social Master">Fast-Cut Kinetic Social Master</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Minutes requested + live price recalculation */}
              <div className="liquid-glass-subtle rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <label htmlFor="order-minutes" className="block text-xs uppercase tracking-wider text-white font-medium mb-1">
                      Minutes of Final Edited Video
                    </label>
                    <span className="text-xs text-neutral-400">
                      Standard Rate: 30,000 MMK per minute
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      id="order-minutes"
                      type="number"
                      min="1"
                      max="60"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 px-3 py-2 text-center rounded-xl bg-black border border-white/20 text-white font-mono font-semibold text-lg focus:outline-none focus:border-white"
                    />
                    <span className="text-xs text-neutral-400 font-mono">Minute(s)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs">
                  <span className="text-neutral-400 font-medium">Calculated Project Total:</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {totalPrice.toLocaleString()} MMK
                  </span>
                </div>
              </div>

              {/* Row 5: Project Brief / Notes */}
              <div>
                <label htmlFor="order-description" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                  Project Brief & Specific Instructions
                </label>
                <textarea
                  id="order-description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide pacing notes, target delivery date, copy to display, or external drive links for extra raw footage bins..."
                  className="w-full px-4 py-3 rounded-xl liquid-glass-subtle border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-sm font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Video & Order via Telegram API...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Order & Video ({totalPrice.toLocaleString()} MMK)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-500 mt-4">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Server-Side Token Isolation</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Database Logged</span>
                  </span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
