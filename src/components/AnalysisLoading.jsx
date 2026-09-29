import React, { useState, useEffect } from 'react';
import { Sparkles, Feather, Compass, Heart } from 'lucide-react';

const CONTEMPLATIVE_PROMPTS = [
  "Menenangkan pikiran dan membuka mata hati...",
  "Mengamati kualitas: Apakah objek ini lembut, megah, kokoh, atau rumit?",
  "Jika objek alam ini bisa berbicara, apa pesan yang ingin ia sampaikan?",
  "Mencari cerminan 99 Nama Ilahiah Allah di balik bentuk fisik ini...",
  "Segala sesuatu yang ada, ada bersama-sama dengan sifat-sifat Allah..."
];

export function AnalysisLoading({ previewImage }) {
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % CONTEMPLATIVE_PROMPTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-8 sm:py-12 px-3 sm:px-4 text-center space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Meditative Breathing Circle Visualizer */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
        {/* Outer glowing pulsing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#578866]/30 animate-ping opacity-25" />
        <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-[#d4a737]/20 animate-pulse" />
        
        {/* Image preview or leaf icon in center */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-xl bg-[#e2ede5] flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Menganalisis"
              className="w-full h-full object-cover filter brightness-95 scale-105 transition-transform duration-1000"
            />
          ) : (
            <Feather className="w-10 h-10 sm:w-12 sm:h-12 text-[#253d2d] animate-float" />
          )}
          <div className="absolute inset-0 bg-[#1b2e21]/30 backdrop-blur-[1px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#fcf6e5] animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>

      {/* Text guidance */}
      <div className="space-y-2 sm:space-y-3 px-2">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#a96739] font-sans">
          Proses Fakkara Mendalam
        </span>
        <h3 className="font-serif text-xl sm:text-3xl font-medium text-[#1b2e21] transition-all duration-500 min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center">
          "{CONTEMPLATIVE_PROMPTS[promptIndex]}"
        </h3>
        <p className="text-[11px] sm:text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
          Tarik napas perlahan. Biarkan batin bersiap menyaksikan keterhubungan antara alam semesta dan Sang Pencipta.
        </p>
      </div>

      {/* Subtle Progress Bar */}
      <div className="w-36 sm:w-48 h-1 bg-[#ece4d6] rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#42694f] via-[#d4a737] to-[#42694f] w-full animate-pulse-subtle" />
      </div>

    </div>
  );
}
