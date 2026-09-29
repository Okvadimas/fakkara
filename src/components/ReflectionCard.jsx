import React, { useRef, useState } from 'react';
import { Download, Share2, Bookmark, BookmarkCheck, RotateCcw, Sparkles, Feather, Heart, Quote, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export function ReflectionCard({
  result,
  imageUrl,
  onReset,
  onSaveToJournal,
  isSaved
}) {
  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Trigger subtle celebration
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#42694f', '#d4a737', '#c47c49']
      });

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#fbf9f5'
      });

      const link = document.createElement('a');
      const safeTitle = (result.objectName || 'fakkara').toLowerCase().replace(/\s+/g, '-');
      link.download = `fakkara-${safeTitle}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh kartu gambar:', err);
      alert('Gagal membuat gambar kartu renungan. Silakan coba kembali.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const textToShare = `🌿 Fakkara: ${result.objectName}\n\n` +
      `Sifat Ilahi yang terpancar:\n` +
      result.divineNames.map(n => `• ${n.latin} (${n.arabic}) - ${n.meaning}`).join('\n') +
      `\n\n"${result.voiceOfNature}"\n\n` +
      `Segala sesuatu yang ada di alam semesta ini ada bersama-sama dengan sifat-sifat Allah.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Fakkara - ${result.objectName}`,
          text: textToShare,
          url: window.location.href
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-16 px-1 sm:px-0">
      
      {/* Action Toolbar Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white/90 border border-[#ded2be] shadow-sm backdrop-blur-md">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-medium text-stone-600 hover:text-[#1b2e21] transition-colors rounded-xl hover:bg-[#f5f0e8] active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-stone-500" />
          <span>Fakkara Objek Lain</span>
        </button>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {/* Baris 1: Simpan & Bagikan */}
          <div className="flex items-center gap-2 w-full">
            {/* Save to Journal */}
            <button
              onClick={onSaveToJournal}
              disabled={isSaved}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border active:scale-95 ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-stone-700 border-[#ded2be] hover:bg-[#f5f0e8]'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-[#32523d]" />}
              <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white text-stone-700 border border-[#ded2be] hover:bg-[#f5f0e8] transition-all active:scale-95"
              title="Bagikan Teks Renungan"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-stone-600" />}
              <span>{copiedText ? 'Tersalin' : 'Bagikan'}</span>
            </button>
          </div>

          {/* Baris 2: Unduh Kartu (PNG) - Dibuat di bawahnya simpan & bagikan */}
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="w-full btn-primary text-xs py-2 px-3.5 sm:px-4 shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
            title="Unduh Kartu Estetis PNG"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{isExporting ? 'Memproses...' : 'Unduh Kartu (PNG)'}</span>
          </button>
        </div>
      </div>

      {/* The Printable Aesthetic Card */}
      <div
        ref={cardRef}
        id="fakkara-reflection-card"
        className="zen-card p-4 sm:p-10 border-2 border-[#ece4d6] bg-[#fbf9f5] relative overflow-hidden shadow-2xl space-y-6 sm:space-y-8"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(87, 136, 102, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(196, 124, 73, 0.05) 0%, transparent 40%)'
        }}
      >
        {/* Subtle Ornamental Frame Corner */}
        <div className="flex items-center justify-between text-stone-400 text-[10px] sm:text-xs font-serif tracking-widest uppercase pb-1 border-b border-[#ece4d6]/60">
          <span>FAKKARA • فَكَّرَ</span>
          <span>99 ASMAUL HUSNA</span>
        </div>

        {/* Top Header: Object Identification & Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Photo with Organic Border */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border-2 sm:border-4 border-white aspect-square max-h-[300px] sm:max-h-none mx-auto bg-stone-200">
              <img
                src={imageUrl}
                alt={result.objectName}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/20 text-white flex items-center justify-between text-[11px] sm:text-xs">
                <span className="font-medium tracking-wide">Ciptaan di Alam</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-200 font-semibold">
                  {result.category || 'Objek Alam'}
                </span>
              </div>
            </div>
          </div>

          {/* Object Name & Observed Qualities */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold text-[#a96739]">
                Pengamatan Objek Alam
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b2e21] leading-tight">
                {result.objectName}
              </h2>
            </div>

            {/* Observable Qualities Chips */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[11px] sm:text-xs font-medium text-stone-500 uppercase tracking-wider">
                Kualitas yang Teramati:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {result.qualities?.map((quality, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] sm:text-xs font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white text-[#253d2d] border border-[#ded2be] shadow-2xs"
                  >
                    ✦ {quality}
                  </span>
                ))}
              </div>
            </div>

            {/* Voice of Nature: If this could speak - Gambar 2 Fix: flex header agar icon tidak tabrakan dengan teks */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f0f6f2] border border-[#e2ede5] mt-1 sm:mt-2">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#32523d]">
                  Suara Keheningan Alam:
                </p>
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-[#578866]/50 shrink-0" />
              </div>
              <p className="font-serif italic text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed">
                "{result.voiceOfNature}"
              </p>
            </div>
          </div>

        </div>

        {/* Section Divider - Gambar 3 Fix: Garis terbelah di kiri & kanan sehingga tidak memotong/menabrak teks & icon */}
        <div className="py-2 sm:py-3 flex items-center gap-3 sm:gap-4">
          <div className="flex-1 border-t border-[#ded2be]" />
          <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#f5f0e8] border border-[#ded2be] flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-serif text-[#a96739] font-semibold tracking-wider sm:tracking-widest uppercase shrink-0 shadow-2xs">
            <Feather className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#a96739]" />
            <span>Cerminan Sifat-Sifat Ilahi</span>
            <Feather className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#a96739]" />
          </div>
          <div className="flex-1 border-t border-[#ded2be]" />
        </div>

        {/* Asmaul Husna Divine Names Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {result.divineNames?.map((divine, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#ded2be] shadow-sm flex flex-col justify-between space-y-2.5 sm:space-y-3 hover:border-[#32523d] transition-all"
            >
              {/* Arabic & Latin Header */}
              <div className="flex items-start justify-between border-b border-[#ece4d6] pb-2 sm:pb-3">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1b2e21]">
                    {divine.latin}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#a96739] font-medium">
                    {divine.meaning}
                  </p>
                </div>
                <span className="font-arabic text-2xl sm:text-3xl font-bold text-[#32523d] leading-none pt-0.5">
                  {divine.arabic}
                </span>
              </div>

              {/* Spiritual Reflection on this Object */}
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {divine.reflection}
              </p>

              {/* Micro Dhikr Chant Reminder - Gambar 4 Fix: Berikan padding dalam yang nyaman, rapi, dan tidak menempel garis */}
              <div className="mt-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#f0f6f2] border border-[#d2e4d8] flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
                <span className="text-[#42694f] font-medium shrink-0">Dzikir Kontemplasi:</span>
                <span className="font-serif italic font-bold text-[#1b2e21] text-right">
                  "Yaa Allah, Yaa {divine.latin?.replace(/^Al-|^Ar-|^As-|^An-|^Ash-|^Azh-/, '')}"
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Spiritual Contemplation - Gambar 5 Fix: Background dark forest green dengan kontras tinggi sehingga teks terbaca sangat jelas */}
        <div
          className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4 shadow-lg border border-[#385c43] text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e3525 0%, #132217 100%)',
            color: '#ffffff'
          }}
        >
          {/* Subtle decorative glow */}
          <div
            className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #d4a737 0%, transparent 70%)' }}
          />

          <div className="flex items-center gap-2 relative z-10">
            <Sparkles className="w-4 h-4 text-[#fde68a] shrink-0" />
            <h4 className="font-serif text-base sm:text-lg font-bold tracking-wide text-[#fde68a]">
              Mutiara Tadabbur
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-[#e8f0eb] leading-relaxed font-sans font-normal relative z-10">
            {result.contemplation}
          </p>

          <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] sm:text-xs text-[#b8d1bf] relative z-10">
            <span className="italic">"Segala sesuatu di alam ada bersama sifat-sifat Allah."</span>
            <span className="font-arabic text-[#fde68a] font-bold text-sm sm:text-base">سُبْحَانَ اللَّهِ</span>
          </div>
        </div>

        {/* Card Footer Branding */}
        <div className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400">
          <span>Fakkara • 99 Asmaul Husna</span>
          <span>remember.local</span>
        </div>

      </div>

      {/* Post-Reflection Journaling Prompt */}
      <div className="zen-card p-4 sm:p-6 border border-[#ded2be] bg-white space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#a96739]" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1b2e21]">
            Refleksi Batin Anda
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          "Apa yang muncul di hati Anda ketika merenungkan kebenaran ini? Bagaimana Anda akan melihat dunia secara berbeda jika Anda melihat segala sesuatu sebagai cerminan Tuhan?"
        </p>
      </div>

    </div>
  );
}
