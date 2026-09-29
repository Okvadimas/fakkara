import React from 'react';
import { Compass, BookOpen, Settings, Sparkles, Feather } from 'lucide-react';

export function Navbar({ onOpenJournal, onOpenSettings, journalCount, hasApiKey }) {
  return (
    <header className="zen-glass sticky top-0 z-40 w-full border-b border-[#ece4d6]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#32523d] to-[#1b2e21] flex items-center justify-center text-[#ded2be] shadow-md border border-[#42694f] shrink-0">
            <Feather className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-[#1b2e21]">
                TADABBUR
              </span>
              <span className="font-arabic text-xs sm:text-sm text-[#a96739] font-bold">
                تَدَبُّر
              </span>
            </div>
            <p className="text-[11px] text-[#5c5750] hidden sm:block tracking-wide">
              Menyaksikan Sifat-Sifat Allah di Seluruh Bentuk Alam
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Journal Button */}
          <button
            onClick={onOpenJournal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-[#2b2824] bg-white border border-[#ded2be] hover:bg-[#f5f0e8] hover:border-[#a96739] transition-all shadow-sm active:scale-95"
            title="Buka Jurnal Renungan Tersimpan"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#32523d]" />
            <span className="text-xs sm:text-sm font-medium">Jurnal</span>
            {journalCount > 0 && (
              <span className="px-1.5 py-0.2 sm:px-2 sm:py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-[#e2ede5] text-[#253d2d] border border-[#a96739]/30">
                {journalCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-[#2b2824] bg-white border border-[#ded2be] hover:bg-[#f5f0e8] transition-all shadow-sm active:scale-95"
            title="Pengaturan Google Gemini API Key"
          >
            <div className="relative">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5c5750]" />
              <span
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  hasApiKey ? 'bg-emerald-500 ring-2 ring-white' : 'bg-amber-400'
                }`}
              />
            </div>
            <span className="text-xs sm:text-sm font-medium hidden xs:inline">
              {hasApiKey ? 'AI Aktif' : 'Atur API'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
