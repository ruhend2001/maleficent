const { NeonDB } = require('mf-system');
const options = {
  NEON: {
    URL: "postgresql://XXXX"
  }
};
const backupNeon = async () => await NeonDB.Backup(options);
const restoreNeon = async () => await NeonDB.Restore(options);
if (backup_neon) {
  console.log('AutoBackup Neon Aktif');
  NeonDB.AutoBackup(options);
};
module.exports = { backupNeon, restoreNeon };
/** https://neon.com kalo g bisa ke buka pake mode ceklis situs desktop , cloud ini mirip monggo db mudah 
 * jika ingin menggunakan cloud neon sebagai penyimpanan database silahkan daftar akun lalu kamu cuma perlu mengisi url di atas itu saja
 * 1. kalo udh daftar nanti disuruh bikin organisasi nama bebas dan pilih yang free seperti ini https://files.catbox.moe/y1rted.jpg
 * 2. klik create projek https://files.catbox.moe/pzgf56.jpg
 * 3. nama projek nya database , versi 18 region bebas lalu klik create https://files.catbox.moe/hzh30d.jpg
 * 4. nah urlnya itu klik overview trs klik connect https://files.catbox.moe/okvp8z.jpg
 * 5. nah klik gambar mata baru copy snippet https://files.catbox.moe/uzs70v.jpg
 * 6. udah deh urlnya pastein ganti di atas situ kalo udh dari bot nya ketik .backup neon , kalo mau restore .restore neon, kalo mau nyalain autobackup nya  .on autobackup neon, matiinnya .off autobackup neon
 * 7. lihatnha tinggal klik menu table di neonya 
 * 8. Done!
 **/