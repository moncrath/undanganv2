# undanganv2 — Master State ❤️🔪

Dokumen status utama untuk melacak progres pembangunan Undangan Pernikahan Interaktif (Cozy Mystery Game style) bersama Sayang.

---

## 📋 Project Overview & Status
*   **Project Name**: Undangan Pernikahan Interaktif (undanganv2)
*   **Target**: Aplikasi web undangan satu halaman (Single Page Application) bergaya game misteri interaktif di mana tamu dapat mengetuk 5 objek utama di dalam ruangan/halaman romantis untuk mengungkap detail acara.
*   **Status**: 🟡 In Development
*   **Current Focus**: Melakukan uji visual responsif di browser, mengintegrasikan aset riil (jika ada), dan memoles micro-interactions agar terasa mewah.

## 🛠️ Technical Stack & Architecture
*   **Core**: HTML5, Vanilla CSS3 (Custom transitions, glassmorphism, responsive grids), Vanilla JavaScript (State management, local storage chat, interactive elements).
*   **Interactive Style**: Cozy Room / Garden click-to-reveal modal interface. Responsive viewport simulation.
*   **Storage**: LocalStorage (untuk fitur Buku Tamu / Guestbook lokal).

## 🗂️ Major Decision Log
1.  **2026-05-17 — Vanilla Stack Choice**: Memilih vanilla HTML/CSS/JS murni agar ringan, loading super cepat (penting untuk web undangan di HP), serta fleksibilitas animasi custom yang tinggi tanpa framework overhead.

## 🐛 Bug Log
| ID | Date | Severity | Description | Status | Fix Ref |
|---|---|---|---|---|---|
| BUG-1 | 2026-05-17 | 🟡 | Custom icon size not applying due to CSS specificity being overridden by generic placeholder styles. | ✅ Fixed | style.css (increased specificities) |

## 🏗️ Project Build Log
### Milestone 1: Inisialisasi & Fondasi Dokumentasi — 2026-05-17
- [✅] Step 1: Git Initialization — 2026-05-17 — Git repository diinisialisasi sukses.
- [✅] Step 2: Master State & Lessons Learned Setup — 2026-05-17 — Struktur dokumentasi dasar siap.
- [✅] Step 3: Base Layout & Styling — 2026-05-17 — index.html dan layout dasar cozy room bertema warm romantis siap.
- [✅] Step 4: Interactive Logic & Popups — 2026-05-17 — app.js menangani interaksi ketuk 5 objek dan modal popup transisi halus.
- [✅] Step 5: Guestbook Integration with LocalStorage — 2026-05-17 — Fitur buku tamu lokal dapat menyimpan pesan tamu dinamis.
- [✅] Step 6: Polish, Animations, & Responsive Testing — 2026-05-17 — Animasi floating particles, preloader interaktif, salin norek, dan responsivitas seluler selesai.

## 🎯 Next Steps
1. ✅ Jalankan browser subagent / cek local server untuk memverifikasi visual preloader, interaksi objek, dan pengisian guestbook (Selesai: disesuaikan dengan foto referensi).
2. Tambahkan aset personalisasi riil (foto mempelai, detail rekening nyata, lagu khusus).
3. Lakukan Git Commit pertama untuk mendokumentasikan hasil kerja kita.
