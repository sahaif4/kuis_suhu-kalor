# Update Penting untuk Apps Script

Agar data benar-benar masuk, kode di Google Apps Script harus bisa menangani parameter yang dikirim.

Mohon ganti kode di Apps Script Anda dengan versi **TERBARU & LEBIH KUAT** ini:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Tunggu antrian (biar data gak tabrakan)

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Fallback: Jika parameter ada di postData (JSON/Text) atau parameter URL
    var p = e.parameter;
    
    // Jika data dikirim sebagai string raw body
    if (!p.nama && e.postData && e.postData.contents) {
       try {
         var data = JSON.parse(e.postData.contents);
         p = data;
       } catch(err) {
         // Jika bukan JSON, mungkin URL encoded string
         var parts = e.postData.contents.split('&');
         for (var i = 0; i < parts.length; i++) {
           var pair = parts[i].split('=');
           p[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
         }
       }
    }

    var timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    sheet.appendRow([
      timestamp,
      p.nama || "Tanpa Nama",
      p.nim || "-",
      p.nilai || "0",
      p.status || "-",
      p.pelanggaran || "0"
    ]);

    return ContentService.createTextOutput("Sukses");
  } catch (e) {
    return ContentService.createTextOutput("Error: " + e.toString());
  } finally {
    lock.releaseLock();
  }
}
```

## Setelah Update Kode:
1. Klik **Save** (Ikon Disket).
2. Klik **Deploy** > **Manage deployments**.
3. Klik **Edit** (Pensil).
4. **PENTING**: Ganti Version ke **New version**.
5. Klik **Deploy**.
