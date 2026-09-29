# 🌿 TADABBUR — Menyaksikan Sifat-Sifat Allah di Alam Semesta

Aplikasi web kontemplasi spiritual yang terinspirasi dari latihan tadabbur alam: berjalan di alam, memperhatikan ciptaan Tuhan (pohon, batu, gunung, ombak, bunga, langit, danau), serta merenungkan kenyataan bahwa **segala sesuatu yang ada di alam raya ini ada bersama-sama dengan sifat-sifat Allah (99 Asmaul Husna)**.

---

## ✨ Fitur Utama

1. **Input Foto & Kamera HP Langsung**
   - Ambil foto langsung saat berjalan di alam menggunakan kamera smartphone atau unggah gambar dari galeri/laptop.
   - Tanpa perlu mengetik panjang lebar; AI akan mengamati objek dan menganalisis kualitasnya secara otomatis.

2. **Analisis Multimodal AI (Google Gemini Free Tier)**
   - Menggunakan Google Gemini Vision API untuk mendeteksi objek alam, tekstur, lingkungan, dan kualitas hakikinya.
   - Dilengkapi sistem *Smart Local Fallback* dan dataset 99 Asmaul Husna lengkap sehingga aplikasi tetap berfungsi meskipun tanpa koneksi API.

3. **Kualitas yang Teramati & "Suara Keheningan Alam"**
   - Menggali kualitas objek: Apakah ia lembut, megah, kokoh, rumit, memberi naungan, atau penuh kehidupan?
   - Menguraikan pesan kebijaksanaan: *"Jika pohon atau batu ini bisa berbicara kepada jiwa manusia, apa yang akan disampaikannya?"*

4. **Pemetaan ke 99 Asmaul Husna**
   - Menampilkan Nama-Nama Allah yang paling relevan dengan tulisan kaligrafi Arab (`Amiri`), transliterasi Latin, makna bahasa Indonesia, dan perenungan mengapa objek tersebut mencerminkan sifat-Nya.
   - Panduan lafadz dzikir kontemplasi (contoh: *"Yaa Allah, Yaa Latif"* atau *"Yaa Allah, Yaa Matin"*).

5. **Kartu Renungan Estetis (Download PNG & Bagikan)**
   - Hasil kontemplasi diformat dalam kartu grafis berestetika *Earthy Serenity & Organic Zen* (perpaduan warna sage green, sand/cream, dan aksen emas).
   - Fitur sekali klik **"Unduh Kartu (PNG)"** untuk disimpan ke galeri atau dibagikan ke media sosial/status WhatsApp.

6. **Jurnal Tadabbur Alam (Tersimpan di Browser)**
   - Simpan setiap momen perenungan Anda ke dalam jurnal digital lokal.
   - Buka kembali catatan dan kartu renungan yang pernah Anda buat kapan saja.

7. **Preset Inspirasi Cepat**
   - Tersedia contoh siap pakai (Bunga Liar & Embun, Batu Karang Purba, Pohon Rindang Meneduhkan, dan Puncak Gunung Berkabut) untuk eksplorasi instan.

8. **Pengaturan API Key yang Fleksibel & Aman**
   - Masukkan API Key Google Gemini gratis Anda langsung melalui antarmuka web (tersimpan di `localStorage` peramban Anda), atau konfigurasi melalui file `.env`.

---

## 🚀 Cara Menjalankan Aplikasi

Pastikan Node.js telah terinstal di komputer Anda:

```bash
# 1. Masuk ke direktori proyek
cd c:\laragon\www\remember

# 2. Instal dependensi (jika belum)
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka peramban Anda di alamat: **`http://localhost:5173/`**

---

## 🔑 Pengaturan Google Gemini API (100% Gratis)

1. Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Buat API Key gratis (tanpa memerlukan kartu kredit).
3. Buka website Tadabbur, klik tombol **"Atur API"** di pojok kanan atas, lalu tempelkan API Key Anda dan klik **"Simpan & Terapkan"**.
4. Atau, salin file `.env.example` menjadi `.env` dan isi:
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...
   ```

---

## 🎨 Desain & Estetika
- **Gaya Visual:** *Earthy Serenity & Organic Zen*
- **Palet Warna:** Sage Green, Warm Sand, Soft Olive, Golden Amber, Deep Forest Charcoal
- **Tipografi:** Cormorant Garamond (Serif Display), Amiri (Arab Kuno/Quranic), Plus Jakarta Sans (Body)
