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
      const safeTitle = (result.objectName || 'tadabbur-alam').toLowerCase().replace(/\s+/g, '-');
      link.download = `tadabbur-${safeTitle}-${Date.now()}.png`;
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
    const textToShare = `🌿 Tadabbur Alam: ${result.objectName}\n\n` +
      `Sifat Ilahi yang terpancar:\n` +
      result.divineNames.map(n => `• ${n.latin} (${n.arabic}) - ${n.meaning}`).join('\n') +
      `\n\n"${result.voiceOfNature}"\n\n` +
      `Segala sesuatu yang ada di alam semesta ini ada bersama-sama dengan sifat-sifat Allah.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tadabbur Alam - ${result.objectName}`,
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
          <span>Tadabbur Objek Lain</span>
        </button>

        <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
          {/* Save to Journal */}
          <button
            onClick={onSaveToJournal}
            disabled={isSaved}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all border active:scale-95 ${
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
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white text-stone-700 border border-[#ded2be] hover:bg-[#f5f0e8] transition-all active:scale-95"
            title="Bagikan Teks Renungan"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-stone-600" />}
            <span>{copiedText ? 'Tersalin' : 'Bagikan'}</span>
          </button>

          {/* Download Image Card */}
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex-1 sm:flex-initial btn-primary text-xs py-2 px-3.5 sm:px-4 shadow-sm active:scale-95"
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
        id="tadabbur-reflection-card"
        className="zen-card p-4 sm:p-10 border-2 border-[#ece4d6] bg-[#fbf9f5] relative overflow-hidden shadow-2xl space-y-6 sm:space-y-8"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(87, 136, 102, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(196, 124, 73, 0.05) 0%, transparent 40%)'
        }}
      >
        {/* Subtle Ornamental Frame Corner */}
        <div className="flex items-center justify-between text-stone-400 text-[10px] sm:text-xs font-serif tracking-widest uppercase pb-1 border-b border-[#ece4d6]/60">
          <span>TADABBUR • تَفَكُّر</span>
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

            {/* Voice of Nature: If this could speak */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f0f6f2] border border-[#e2ede5] relative mt-1 sm:mt-2">
              <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-[#578866]/40 absolute top-2.5 right-2.5 sm:top-3 sm:right-3" />
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#32523d] mb-1">
                Suara Keheningan Alam:
              </p>
              <p className="font-serif italic text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed">
                "{result.voiceOfNature}"
              </p>
            </div>
          </div>

        </div>

        {/* Section Divider */}
        <div className="relative py-1 sm:py-2 flex items-center justify-center">
          <div className="w-full border-t border-[#ece4d6]" />
          <div className="absolute px-3 sm:px-4 bg-[#fbf9f5] flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-serif text-[#a96739] font-semibold tracking-wider sm:tracking-widest uppercase">
            <Feather className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Cerminan Sifat-Sifat Ilahi</span>
            <Feather className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
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

              {/* Micro Dhikr Chant Reminder */}
              <div className="pt-2 border-t border-dashed border-[#ece4d6] flex items-center justify-between text-[10px] sm:text-[11px] text-[#578866] font-medium">
                <span>Dzikir Kontemplasi:</span>
                <span className="font-serif italic font-bold">
                  "Yaa Allah, Yaa {divine.latin?.replace(/^Al-|^Ar-|^As-|^An-|^Ash-|^Azh-/, '')}"
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Spiritual Contemplation */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#253d2d] to-[#1b2e21] text-white space-y-2.5 sm:space-y-3 shadow-md border border-[#32523d]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-amber-200">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <h4 className="font-serif text-base sm:text-lg font-bold tracking-wide">
              Mutiara Tadabbur
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans font-light">
            {result.contemplation}
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400">
            <span>"Segala sesuatu di alam ada bersama sifat-sifat Allah."</span>
            <span className="font-arabic text-amber-300 text-sm sm:text-base">سُبْحَانَ اللَّهِ</span>
          </div>
        </div>

        {/* Card Footer Branding */}
        <div className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400">
          <span>Tadabbur Alam • 99 Asmaul Husna</span>
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
