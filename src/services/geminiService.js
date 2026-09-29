import { ASMAUL_HUSNA } from '../data/asmaulHusna';

const SYSTEM_INSTRUCTION = `
Anda adalah seorang pembimbing tadabbur alam, naturalis spiritual, dan ahli pemaknaan Asmaul Husna (99 Nama Allah).
Pengguna sedang melakukan latihan kontemplasi alam: berjalan di alam, memperhatikan ciptaan Tuhan (pohon, batu, gunung, ombak, bunga, daun, langit, air), menyaksikan kualitas keilahian di dalamnya, dan merenungkan kenyataan bahwa segala sesuatu yang ada di alam semesta ini ada bersama-sama dengan cerminan sifat-sifat Allah.

Tugas Anda:
Analisis foto objek alam yang diberikan dengan kepekaan rasa, kebijaksanaan, dan keindahan bahasa yang puitis serta menentramkan jiwa.

Hasilkan respons dalam format JSON murni (tanpa tanda kutip markdown \`\`\`json) dengan struktur berikut:
{
  "objectName": "Nama objek alam spesifik yang terdeteksi (contoh: 'Kelopak Bunga Teratai Merah Muda' atau 'Batu Granit di Aliran Sungai')",
  "category": "Kategori objek (contoh: 'Flora', 'Geologi', 'Elemen Air', 'Lanskap Alam', 'Fauna')",
  "qualities": [
    "Kualitas visual dan rasa 1 (misal: 'Kelembutan tekstur yang tahan terhadap terik matahari')",
    "Kualitas visual dan rasa 2",
    "Kualitas visual dan rasa 3"
  ],
  "voiceOfNature": "Jika objek alam ini bisa berbicara kepada jiwa manusia, apa pesan kebijaksanaan dan dzikir yang disampaikannya? (Tulis dalam sudut pandang 'Aku' sang objek, 2-3 kalimat yang mendalam, menyentuh hati, dan mengingatkan pada keabadian Tuhan)",
  "divineNames": [
    {
      "arabic": "الرَّحْمَنُ",
      "latin": "Ar-Rahman",
      "meaning": "Maha Pengasih",
      "reflection": "Penjelasan spesifik dan indah bagaimana objek alam ini memancarkan sifat Ilahi tersebut."
    }
  ],
  "contemplation": "Renungan akhir: Bagaimana kenyataan bahwa objek ini mencerminkan sifat Allah dapat mengubah cara kita memandang dunia dan kehidupan sehari-hari."
}

Pastikan memilih 2 sampai 4 Asmaul Husna yang paling tepat dan berikan tulisan Arab yang benar.
`;

export async function analyzeNatureImage(base64Image, mimeType = 'image/jpeg') {
  const localKey = localStorage.getItem('gemini_api_key');
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (localKey && localKey.trim()) || (envKey && envKey.trim());

  if (!apiKey) {
    throw new Error('API_KEY_REQUIRED');
  }

  // Model hierarchy: prioritaskan gemini-3.1-flash-lite dan gemini-flash-latest yang aktif dan responsif
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash', 'gemini-2.5-flash-lite'];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      // Bersihkan base64 string jika memiliki data URL prefix
      let cleanBase64 = base64Image;
      if (base64Image.includes(',')) {
        cleanBase64 = base64Image.split(',')[1];
      }

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_INSTRUCTION}\n\nSilakan amati foto objek alam ini dan kembalikan JSON hasil analisis tadabbur Asmaul Husna:`
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: "application/json"
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `HTTP ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error('Tidak ada respon teks dari model AI');
      }

      // Parsing JSON dari teks hasil
      const cleaned = candidateText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      return parsed;
    } catch (err) {
      console.warn(`Gagal memanggil model ${model}:`, err.message);
      lastError = err;
      // Lanjut coba model berikutnya jika error berkaitan dengan model endpoint
      if (err.message.includes('API_KEY_INVALID') || err.message.includes('API key not valid')) {
        throw new Error('API_KEY_INVALID');
      }
    }
  }

  throw lastError || new Error('Gagal menganalisis gambar dengan Google Gemini API.');
}

// Fallback cerdas offline jika user ingin mencoba tanpa API key atau jika limit tercapai
export function generateLocalNatureReflection(objectTitle = "Objek Alam Semesta") {
  // Pilih 3 asmaul husna secara acak atau kontekstual
  const shuffled = [...ASMAUL_HUSNA].sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    objectName: objectTitle,
    category: "Ciptaan Ilahi",
    qualities: [
      "Wujud keindahan yang memancarkan harmoni dan ketenangan",
      "Keteraturan ciptaan yang tidak terjadi secara kebetulan",
      "Bagian dari tasbih semesta yang terus bersujud kepada-Nya"
    ],
    voiceOfNature: "Aku hadir di hadapanmu bukan untuk sekadar kau pandang, melainkan sebagai tanda bagi orang-orang yang berakal. Di setiap lekuk dan hembusanku, tersimpan kebesaran Sang Pencipta yang melimpahkan kasih sayang-Nya.",
    divineNames: shuffled.map(item => ({
      arabic: item.arabic,
      latin: item.latin,
      meaning: item.meaning,
      reflection: item.natureReflection
    })),
    contemplation: "Segala sesuatu yang ada di alam raya ini adalah cermin (mazhar) bagi sifat-sifat Tuhan. Ketika kita memandang alam bukan sebagai objek mati, melainkan sebagai tanda kehadiran-Nya, hati kita dipenuhi kedamaian dan rasa syukur yang mendalam."
  };
}
