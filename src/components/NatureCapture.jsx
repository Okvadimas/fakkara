import React, { useRef, useState } from 'react';
import { Camera, Upload, Sparkles, Image as ImageIcon, Compass, ArrowRight, Eye } from 'lucide-react';
import { SAMPLE_DEMOS } from '../data/sampleDemos';

export function NatureCapture({ onSelectImage, onSelectDemo, isAnalyzing }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedPreview(event.target.result);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedPreview && selectedFile) {
      onSelectImage(selectedPreview, selectedFile.type);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 sm:space-y-12 px-1 sm:px-0">
      
      {/* Hero Spiritual Introduction */}
      <div className="text-center space-y-3 sm:space-y-4 pt-2 sm:pt-4 pb-1">
        
        <h1
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1b2e21] leading-snug sm:leading-tight max-w-3xl mx-auto px-2 mt-6"
          style={{ marginTop: '24px' }}
        >
          Lihatlah Alam, Temukan <br />
          <span className="italic font-semibold text-[#a96739]">Cerminan Sifat-Sifat Ilahi</span>
        </h1>
        
        <p className="font-sans text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
          Berjalanlah di alam dan biarkan hati Anda memilih sesuatu untuk diperhatikan—pohon, batu, gunung, ombak, bunga, atau sebutir kerikil. Potret objek tersebut dan saksikan bagaimana sifat-sifat Allah meliputinya.
        </p>
      </div>

      {/* Main Upload / Camera Box */}
      <div className="zen-card p-4 sm:p-10 border border-[#ded2be] bg-white/90 backdrop-blur-md shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative background watermark */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-[#253d2d]">
          {/* <Compass className="w-80 h-80" /> */}
        </div>

        {!selectedPreview ? (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl sm:rounded-3xl p-5 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 ${
                dragOver 
                  ? 'border-[#32523d] bg-[#f0f6f2] scale-[1.01]' 
                  : 'border-[#ded2be] hover:border-[#42694f] hover:bg-[#fbf9f5]'
              }`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#f5f0e8] flex items-center justify-center text-[#32523d] shadow-sm border border-[#ece4d6]">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-[#42694f]" />
              </div>

              <div className="space-y-1">
                <p className="font-serif text-lg sm:text-2xl font-semibold text-[#1b2e21]">
                  Potret atau Unggah Foto Alam
                </p>
                <p className="text-[11px] sm:text-sm text-stone-500 max-w-sm mx-auto">
                  Ambil foto langsung saat berjalan di alam atau pilih gambar dari galeri Anda
                </p>
              </div>

              {/* Gambar 2 Fix: Beri space / gap renggang antara tombol Kamera HP dan Galeri */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 mt-3 sm:mt-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    cameraInputRef.current?.click();
                  }}
                  className="btn-primary text-xs sm:text-sm py-3 px-5 shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
                  <span className="font-semibold">Buka Kamera HP</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="btn-secondary text-xs sm:text-sm py-3 px-5 shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <ImageIcon className="w-4 h-4 text-stone-600" />
                  <span>Pilih dari Galeri</span>
                </button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[10px] sm:text-[11px] text-stone-400">
                Mendukung format JPG, PNG, WEBP. AI akan mengenali kualitas & makna Asmaul Husna.
              </span>
            </div>
          </div>
        ) : (
          /* Preview Mode with Confirmation */
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden max-h-[340px] sm:max-h-[420px] bg-stone-900 border border-[#ded2be] shadow-inner flex items-center justify-center">
              <img
                src={selectedPreview}
                alt="Pratinjau Objek Alam"
                className="w-full h-full object-cover max-h-[320px] sm:max-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <span className="text-[11px] sm:text-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-medium">
                  Foto Siap Direnungkan
                </span>
                <button
                  onClick={() => { setSelectedPreview(null); setSelectedFile(null); }}
                  className="text-[11px] sm:text-xs text-stone-200 hover:text-white underline cursor-pointer bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full"
                >
                  Ganti Foto
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1">
              <p className="text-[11px] sm:text-xs text-stone-500 italic text-center sm:text-left">
                "Biarkan hati Anda memilih sesuatu di sekitar Anda untuk direnungkan..."
              </p>

              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-lg active:scale-95"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4a737]" />
                <span>Mulai Tadabbur Objek Ini</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Preset Inspiration Gallery */}
      <div className="space-y-3 sm:space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#32523d]" />
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#1b2e21]">
              Contoh Inspirasi Alam
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs text-stone-500 hidden sm:inline">
            Klik salah satu untuk langsung melihat contoh tadabbur
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SAMPLE_DEMOS.map((demo) => (
            <div
              key={demo.id}
              onClick={() => onSelectDemo(demo)}
              className="group zen-card p-3 sm:p-4 cursor-pointer hover:border-[#32523d] transition-all bg-white relative overflow-hidden flex flex-col active:scale-98 shadow-sm"
            >
              <div className="relative h-28 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3 bg-stone-100">
                <img
                  src={demo.image}
                  alt={demo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-bold bg-[#1b2e21]/80 backdrop-blur-sm text-stone-100 px-2 py-0.5 rounded-md">
                  {demo.category}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between px-0.5">
                <div>
                  <h4 className="font-serif text-xs sm:text-base font-bold text-[#1b2e21] group-hover:text-[#32523d] line-clamp-1 leading-snug mt-2">
                    {demo.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {demo.divineNames.slice(0, 2).map((name, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 sm:py-1 rounded-full bg-[#f0f6f2] text-[#253d2d] border border-[#ece4d6]"
                      >
                        {name.latin}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#ece4d6] flex items-center justify-between text-[11px] sm:text-xs text-[#a96739] font-medium">
                  <span>Tadabbur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
