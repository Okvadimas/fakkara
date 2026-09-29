import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NatureCapture } from './components/NatureCapture';
import { AnalysisLoading } from './components/AnalysisLoading';
import { ReflectionCard } from './components/ReflectionCard';
import { SettingsModal } from './components/SettingsModal';
import { JournalModal } from './components/JournalModal';
import { analyzeNatureImage, generateLocalNatureReflection } from './services/geminiService';
import { Sparkles, AlertCircle, Info, Compass } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [errorNotice, setErrorNotice] = useState(null);
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('tadabbur_journal_entries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sinkronisasi journal ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tadabbur_journal_entries', JSON.stringify(journalEntries));
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage:', e);
    }
  }, [journalEntries]);

  // Handler saat user mengunggah atau memotret objek alam
  const handleSelectImage = async (base64Data, mimeType) => {
    setIsAnalyzing(true);
    setCurrentImageUrl(base64Data);
    setErrorNotice(null);

    try {
      if (!apiKey) {
        // Jika belum ada API key, gunakan refleksi cerdas lokal dan beri notifikasi informatif
        const localReflection = generateLocalNatureReflection("Objek Ciptaan Alam");
        setCurrentResult(localReflection);
        setErrorNotice({
          type: 'info',
          title: 'Mode Contoh Cerdas Aktif',
          message: 'Anda belum memasukkan Gemini API Key. Hasil ini dibuat menggunakan pemetaan Asmaul Husna bawaan. Masukkan API Key gratis di menu "Atur API" untuk analisis visual AI mendalam.'
        });
      } else {
        const analysis = await analyzeNatureImage(base64Data, mimeType);
        setCurrentResult(analysis);
      }
    } catch (err) {
      console.error('Analisis gagal:', err);
      // Fallback agar alur pengguna tidak pernah terputus
      const fallback = generateLocalNatureReflection("Ciptaan Alam");
      setCurrentResult(fallback);

      if (err.message === 'API_KEY_INVALID' || err.message.includes('API key not valid')) {
        setErrorNotice({
          type: 'error',
          title: 'Google Gemini API Key Tidak Valid',
          message: 'Silakan periksa kembali API Key Anda di menu Pengaturan.'
        });
      } else {
        setErrorNotice({
          type: 'warning',
          title: 'Koneksi AI Terkendala',
          message: 'Menggunakan pemetaan Asmaul Husna lokal sementara waktu.'
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler saat user memilih demo preset
  const handleSelectDemo = (demo) => {
    setCurrentImageUrl(demo.image);
    setCurrentResult(demo);
    setErrorNotice(null);
  };

  // Simpan ke jurnal
  const handleSaveToJournal = () => {
    if (!currentResult || !currentImageUrl) return;

    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      result: currentResult,
      imageUrl: currentImageUrl
    };

    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const isCurrentSaved = journalEntries.some(
    (entry) => entry.imageUrl === currentImageUrl || entry.result?.objectName === currentResult?.objectName
  );

  const handleDeleteJournalEntry = (id) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectJournalEntry = (entry) => {
    setCurrentImageUrl(entry.imageUrl);
    setCurrentResult(entry.result);
    setErrorNotice(null);
  };

  const handleReset = () => {
    setCurrentResult(null);
    setCurrentImageUrl(null);
    setErrorNotice(null);
  };

  return (
    <div className="app-container">
      {/* Top Serene Navigation Bar */}
      <Navbar
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        journalCount={journalEntries.length}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Content Area - Gambar 1 Fix: Beri breathing room yang lega dari navbar */}
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-6 pt-8 pb-16 sm:pt-10 sm:pb-20 w-full">
        
        {/* Informative Notification Banner if any */}
        {errorNotice && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-white border border-[#ded2be] shadow-sm flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#a96739] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-[#1b2e21]">
                  {errorNotice.title}
                </h4>
                <p className="text-xs text-stone-600">
                  {errorNotice.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => setErrorNotice(null)}
              className="text-stone-400 hover:text-stone-700 text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* State 1: Loading / Meditative Breathing */}
        {isAnalyzing ? (
          <AnalysisLoading previewImage={currentImageUrl} />
        ) : currentResult ? (
          /* State 2: Result Aesthetic Reflection Card */
          <ReflectionCard
            result={currentResult}
            imageUrl={currentImageUrl}
            onReset={handleReset}
            onSaveToJournal={handleSaveToJournal}
            isSaved={isCurrentSaved}
          />
        ) : (
          /* State 3: Capture / Upload / Preset Picker */
          <NatureCapture
            onSelectImage={handleSelectImage}
            onSelectDemo={handleSelectDemo}
            isAnalyzing={isAnalyzing}
          />
        )}
      </main>

      {/* Footer - Gambar 4 Fix: Tata letak rapi, simetris, dan responsif di mobile */}
      <footer className="w-full border-t border-[#ece4d6] py-8 px-4 text-stone-600 bg-white/70 backdrop-blur-sm mt-8 sm:mt-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-2.5">
          <div className="inline-flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#32523d] shrink-0" />
            <span className="font-serif font-bold text-base tracking-wider text-[#1b2e21]">
              FAKKARA
            </span>
            <span className="font-arabic text-sm text-[#a96739] font-bold">
              فَكَّرَ
            </span>
          </div>
          <p className="text-xs text-stone-600 font-medium max-w-md mx-auto leading-relaxed">
            Menyaksikan Sifat-Sifat Allah di Seluruh Bentuk Alam Semesta
          </p>
          <div className="w-12 h-0.5 bg-[#ded2be]/80 rounded-full my-0.5" />
          <p className="text-[11px] text-stone-500 italic max-w-md mx-auto leading-relaxed px-2">
            "Dan Dia menundukkan malam dan siang, matahari dan bulan untukmu..." (QS. An-Nahl: 12)
          </p>
        </div>
      </footer>

      {/* Settings Modal (Gemini API Key) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onApiKeySaved={(newKey) => setApiKey(newKey)}
        currentApiKey={apiKey}
      />

      {/* Journal Modal (Saved Contemplations) */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        journalEntries={journalEntries}
        onSelectEntry={handleSelectJournalEntry}
        onDeleteEntry={handleDeleteJournalEntry}
      />
    </div>
  );
}
