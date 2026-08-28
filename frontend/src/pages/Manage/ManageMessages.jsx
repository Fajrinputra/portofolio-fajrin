import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Check, RefreshCw, Inbox, Clock } from 'lucide-react';
import api from '../../services/api';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = useCallback(() => {
    setLoading(true);
    api.get('/messages').then(r => setMessages(r.data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    if (selected?.id === id) setSelected(prev => ({ ...prev, is_read: true }));
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    await api.delete(`/messages/${id}`);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Inbox size={20} className="text-violet-400" />
            Pesan Masuk
            {unread > 0 && (
              <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">{unread} baru</span>
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">Pesan dari pengunjung website Anda</p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox size={48} className="text-gray-700 mb-4" />
          <p className="text-gray-500 text-lg font-medium">Belum ada pesan masuk</p>
          <p className="text-gray-600 text-sm mt-1">Pesan dari halaman Kontak akan muncul di sini</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4 min-h-[500px]">
          {/* Daftar pesan */}
          <div className="lg:col-span-2 space-y-2 overflow-y-auto max-h-[620px] pr-1">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.is_read) markRead(msg.id);
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selected?.id === msg.id
                    ? 'border-violet-500 bg-violet-900/20'
                    : 'border-gray-800 hover:border-gray-700 bg-gray-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    {!msg.is_read && (
                      <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`font-medium text-sm truncate ${msg.is_read ? 'text-gray-300' : 'text-white'}`}>
                      {msg.name}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 flex-shrink-0 flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(msg.created_at)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                <p className="text-sm text-gray-400 mt-1.5 line-clamp-2">{msg.message}</p>
              </motion.div>
            ))}
          </div>

          {/* Detail pesan */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-full"
                >
                  {/* Info pengirim */}
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center text-white font-bold text-lg">
                        {selected.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{selected.name}</p>
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-sm text-violet-400 hover:underline flex items-center gap-1"
                        >
                          <Mail size={12} /> {selected.email}
                        </a>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(selected.created_at)}</span>
                  </div>

                  {/* Isi pesan */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2 font-medium uppercase tracking-wider">Pesan</p>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={`mailto:${selected.email}?subject=Re: Pesan dari Fajrin Portfolio`}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      <Mail size={14} /> Balas via Email
                    </a>
                    {!selected.is_read && (
                      <button
                        onClick={() => markRead(selected.id)}
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors"
                      >
                        <Check size={14} /> Tandai Sudah Dibaca
                      </button>
                    )}
                    <button
                      onClick={() => remove(selected.id)}
                      className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/60 text-red-400 text-sm px-4 py-2 rounded-lg transition-colors ml-auto"
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-20 text-center border border-gray-800 rounded-xl bg-gray-900/50"
                >
                  <Mail size={36} className="text-gray-700 mb-3" />
                  <p className="text-gray-500">Pilih pesan untuk membacanya</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
