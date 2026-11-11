const MONGO_URL = 'mongodb://'
// isi url database yang di berikan monggo ganti disitu MONGO_URL atas hanya contoh
if (backup_mongo) {
   console.log('AutoBackup Monggo Aktif');
   socket.MongoDB.AutoBackup(MONGO_URL);
};
// nyalain .on autobackup matiion off autobackup, kalo error kamu salah masukin info password dan url nya matiin ajh sampe masukinya bener bener bener ga ada info error dari monggo nya
module.exports = { 
   backupMongo: async () => await socket.MongoDB.Backup(MONGO_URL.trim()),
   restoreMongo: async () => await socket.MongoDB.Restore(MONGO_URL.trim())
};
/** TUTORIAL
 * Jika Kamu Ingin Memakai Monggo DB https://www.mongodb.com
 * pas daftar setup sndiri sebentar terus di suruh bikin cluster pilih geser yang paling kanan yang free atau otomatis seperti ini https://gachi.gay/0xIgD0
 * terus nama ama password otomatis tersedia langsung copy dulu 22 nya taro di notepad https://gachi.gay/sOUJQc 
 * klik drivernya seperti ini https://gachi.gay/cAni2h
 * nah trs dua tonggle biruin dan salin url nya  https://gachi.gay/x1Q7W7
 * klik database network access https://gachi.gay/kS1iuK
 * klik ip access list dan add https://gachi.gay/0LLaZg
 * delete dulu baru add https://gachi.gay/VBs7dP
 * tambahkan dulu ini baru confirm 0.0.0.0/0    https://gachi.gay/3KH4hA
 * lanjut lihat video https://files.catbox.moe/flr6oo.mp4
**/