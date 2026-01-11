# Panduan Setting Database Nilai (Google Sheets)

Aplikasi kuis ini sekarang menggunakan Google Sheets sebagai database untuk merekap nilai mahasiswa secara otomatis, tanpa perlu mengirim via WhatsApp.

## Langkah 1: Buat Google Sheet
1. Buka [Google Sheets](https://sheets.google.com).
2. Buat Spreadsheet baru.
3. Beri nama (misal: "Rekap Nilai Kuis").
4. Di baris pertama (Header), isi kolom A sampai F dengan:
   - **A1**: Timestamp
   - **B1**: Nama
   - **C1**: NIM
   - **D1**: Nilai
   - **E1**: Status
   - **F1**: Pelanggaran

## Langkah 2: Buat Apps Script
1. Di Google Sheet tersebut, klik menu **Extensions** > **Apps Script**.
2. Akan terbuka tab baru berisi editor kode. Hapus semua kode yang ada (`function myFunction()...`).
3. Copy dan Paste kode berikut ini:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Ambil data dari parameter form (lebih stabil daripada JSON)
  var p = e.parameter;
  
  sheet.appendRow([
    p.timestamp,
    p.nama,
    p.nim,
    p.nilai,
    p.status,
    p.pelanggaran
  ]);
  
  return ContentService.createTextOutput("Sukses");
}
```

## Langkah 3: Deploy Ulang (PENTING!)
Setiap kali Anda mengubah kode, Anda harus melakukan Deploy Ulang agar perubahan efektif.
1. Klik tombol **Deploy** > **Manage deployments**.
2. Klik icon **Pensil (Edit)** di sebelah kanan atas konfigurasi.
3. Pada bagian **Version**, pilih **New version**.
4. Klik **Deploy**.

## Langkah 4: Masukkan URL ke Aplikasi Kuis
1. Buka file `script.js` di folder kuis Anda.
2. Cari baris di bagian atas:
   ```javascript
   const GOOGLE_SCRIPT_URL = "URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI";
   ```
3. Ganti tulisan `URL_GOOGLE_APPS_SCRIPT_ANDA_DISINI` dengan URL yang Anda salin tadi.
4. Simpan file `script.js`.

Sekarang, setiap kali mahasiswa selesai mengerjakan kuis, data nilai mereka akan otomatis masuk ke Google Sheet Anda.
