import React, { useState } from 'react';
import { X, Key, CheckCircle, AlertCircle, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, onApiKeySaved, currentApiKey }) {
  const [keyInput, setKeyInput] = useState(currentApiKey || '');
  const [status, setStatus] = useState(null); // 'testing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      localStorage.removeItem('gemini_api_key');
      onApiKeySaved('');
      setStatus('success');
      setTimeout(() => onClose(), 600);
      return;
    }

    setStatus('testing');
    setErrorMessage('');

    try {
      // Test Gemini API key with a fast small test query
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${trimmed}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Bismillah test connection' }] }]
        })
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson?.error?.message || 'API Key tidak valid atau limit terlampaui.');
      }

      localStorage.setItem('gemini_api_key', trimmed);
      onApiKeySaved(trimmed);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 800);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Gagal memverifikasi API Key.');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setKeyInput('');
    onApiKeySaved('');
    setStatus(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#ded2be] p-5 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#f5f0e8] transition-colors active:scale-95"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-5 pr-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#e2ede5] flex items-center justify-center text-[#253d2d] shrink-0">
            <Key className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b2e21]">
              Pengaturan Gemini AI
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-500">
              Analisis foto alam dengan Google AI
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#fbf9f5] border border-[#ece4d6] mb-5 space-y-2 text-xs text-stone-600">
          <div className="flex items-start gap-2 text-[#32523d] font-semibold text-xs">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Gratis 100% tanpa kartu kredit dari Google AI Studio</span>
          </div>
          <p className="text-[11px] sm:text-xs leading-relaxed">
            API Key Anda disimpan aman langsung di browser lokal Anda sendiri dan tidak dikirim ke server pihak ketiga manapun.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a96739] hover:underline pt-0.5"
          >
            <span>Dapatkan API Key Gratis di Google AI Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Input */}
        <div className="space-y-1.5 sm:space-y-2 mb-5">
          <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-700">
            Google Gemini API Key
          </label>
          <div className="relative">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Contoh: AIzaSy..."
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#ded2be] focus:border-[#42694f] focus:ring-2 focus:ring-[#578866]/20 outline-none text-base sm:text-sm font-mono text-stone-800 transition-all bg-[#fbf9f5]"
            />
            {currentApiKey && (
              <span className="absolute right-2.5 top-2.5 sm:top-3 flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Aktif
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-[11px] text-stone-400">
            *Jika dikosongkan, aplikasi akan menggunakan mode demonstrasi preset bawaan.
          </p>
        </div>

        {/* Status Messages */}
        {status === 'testing' && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-blue-50 text-blue-700 text-xs animate-pulse">
            <span>Menguji koneksi ke Google Gemini API...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Koneksi berhasil! API Key telah tersimpan.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {currentApiKey ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-600 hover:underline py-1.5"
            >
              Hapus Key
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs px-3.5 py-2"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={status === 'testing'}
              className="btn-primary text-xs px-4 sm:px-5 py-2 active:scale-95"
            >
              {status === 'testing' ? 'Memverifikasi...' : 'Simpan & Terapkan'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
