import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Database, CheckCircle, Clock, AlertTriangle, FileVideo, Send } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrdersDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersDatabaseModal: React.FC<OrdersDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        throw new Error('Failed to load database records.');
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching orders database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl liquid-glass-surface rounded-3xl p-6 sm:p-8 flex flex-col max-h-[90vh] relative border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular border line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full liquid-glass-subtle flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                Production Orders Ledger
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Supabase-compatible table schema: <code>orders (id, name, contact, edit_type, minutes, file_ref, timestamp)</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchOrders}
              disabled={loading}
              className="px-3 py-1.5 rounded-full liquid-glass-subtle hover:bg-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full liquid-glass-subtle hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close database modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto my-6 pr-2">
          {error && (
            <div className="p-4 rounded-xl bg-neutral-900 border border-white/15 text-xs text-neutral-300 mb-4">
              {error}
            </div>
          )}

          {orders.length === 0 && !loading ? (
            <div className="text-center py-16 text-neutral-500">
              <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <div className="text-sm font-medium text-neutral-400">No production orders logged yet</div>
              <div className="text-xs text-neutral-600 mt-1">Submit the order form to generate the first verified database record.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/[0.08] text-neutral-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Order ID / Time</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Scope & Style</th>
                    <th className="py-3 px-3">Minutes</th>
                    <th className="py-3 px-3">Total (MMK)</th>
                    <th className="py-3 px-3">Asset Attached</th>
                    <th className="py-3 px-3">Telegram API</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-white font-semibold">{ord.id}</div>
                        <div className="text-[10px] text-neutral-500">
                          {new Date(ord.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-sans font-medium text-white">
                        {ord.name}
                      </td>
                      <td className="py-3.5 px-3 text-neutral-300">
                        {ord.contact}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-neutral-200">{ord.edit_type}</div>
                        <div className="text-[10px] text-neutral-500">{ord.edit_style}</div>
                      </td>
                      <td className="py-3.5 px-3 text-white">
                        {ord.minutes} min
                      </td>
                      <td className="py-3.5 px-3 text-white font-semibold whitespace-nowrap">
                        {ord.total_price_mmk.toLocaleString()} MMK
                      </td>
                      <td className="py-3.5 px-3 text-neutral-300 max-w-[140px] truncate">
                        <div className="flex items-center gap-1.5">
                          <FileVideo className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate">{ord.file_reference}</span>
                        </div>
                        {ord.file_size > 0 && (
                          <div className="text-[10px] text-neutral-500">
                            {(ord.file_size / (1024 * 1024)).toFixed(1)} MB
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {ord.telegram_status === 'sent' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px]">
                            <CheckCircle className="w-3 h-3 text-white" />
                            <span>Forwarded</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[10px]">
                            <Send className="w-3 h-3 text-neutral-400" />
                            <span>Logged</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-500 font-mono">
          <div>
            Total Records: <span className="text-white font-bold">{orders.length}</span>
          </div>
          <div>
            Cut Agency Server Store · 30,000 MMK / Min
          </div>
        </div>
      </div>
    </div>
  );
};
