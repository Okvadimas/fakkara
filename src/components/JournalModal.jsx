import React from 'react';
import { X, BookOpen, Trash2, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export function JournalModal({
  isOpen,
  onClose,
  journalEntries,
  onSelectEntry,
  onDeleteEntry
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#ded2be] p-4 sm:p-8 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#f5f0e8] transition-colors active:scale-95"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#ece4d6] pr-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f0f6f2] flex items-center justify-center text-[#253d2d] border border-[#e2ede5] shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b2e21]">
              Jurnal Fakkara Alam
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-500">
              {journalEntries.length} perenungan sifat-sifat Ilahi tersimpan
            </p>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1">
          {journalEntries.length === 0 ? (
            <div className="text-center py-12 sm:py-16 space-y-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#fbf9f5] border border-[#ece4d6] mx-auto flex items-center justify-center text-stone-400">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-stone-700">
                Belum Ada Jurnal Tersimpan
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Setelah Anda menganalisis foto alam, klik tombol "Simpan ke Jurnal" untuk mengabadikan perenungan Anda di sini.
              </p>
            </div>
          ) : (
            journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="zen-card p-3 sm:p-4 border border-[#ded2be] hover:border-[#32523d] transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 group bg-white"
              >
                {/* Thumbnail & Info */}
                <div
                  onClick={() => { onSelectEntry(entry); onClose(); }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-[#ece4d6]">
                    <img
                      src={entry.imageUrl}
                      alt={entry.result.objectName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#1b2e21] group-hover:text-[#32523d] line-clamp-1">
                        {entry.result.objectName}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] bg-[#f0f6f2] text-[#253d2d] px-2 py-0.5 rounded-full font-medium">
                        {entry.result.category || 'Alam'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {entry.result.divineNames?.slice(0, 3).map((n, idx) => (
                        <span key={idx} className="text-[10px] sm:text-[11px] text-[#a96739] font-medium">
                          ✦ {n.latin}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-stone-400">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(entry.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ece4d6]">
                  <button
                    onClick={() => { onSelectEntry(entry); onClose(); }}
                    className="btn-secondary text-xs py-1.5 px-3 flex-1 sm:flex-initial justify-center active:scale-95"
                    title="Buka Kartu Renungan"
                  >
                    <span>Buka Kartu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1.5 sm:p-2 text-stone-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors active:scale-95"
                    title="Hapus dari Jurnal"
                    aria-label="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 sm:pt-4 border-t border-[#ece4d6] flex items-center justify-between text-[11px] sm:text-xs text-stone-500">
          <span>Tersimpan di browser lokal Anda</span>
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-1 px-3 sm:px-4"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
