const { backup, restore } = require('mongo-client-db'), { MongoDB } = require('utils-mf');
/** 
 * Jika Kamu Ingin Memakai Monggo DB sebagai Backup Penyimpanan Dan Bisa Merestore Lagi
 * https://www.mongodb.com
 **/
/* nama file path database kamu default nya g ush di ganti  */
/* disini kalian cuma perlu ganti 2 nilai itu cuma password dan url nya kalo nama kan itu udh langsung di berikan otomatis dari url monggonya tutorial setup / setting nya di bawah */
const file_restore = './database.json'
/* contoh password database monggo ganti disitu */
const password = 'kv8dLObQ8l3shnmt'
/* contoh url database yang di berikan monggo ganti disitu*/
const url = `mongodb+srv://username:${password}@cluster0.shgob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// for from command plugins 
const backupMongo = async (data) => {
   const response = await backup(url, data);
   console.log(response)
   return response
};
const restoreMongo = async () => {
   const response = await restore(url, file_restore, {
      save_local: true //must be true if run with command .restore
   });
   console.log(response.log)
   return response
};
/* 
 * pilih salah satu ajh ya tempat backup database nya mongo atau github tempat database lain insyaallah nyusul, 
 * bisa sekaligus backupnya sih ke semua tempat, tapi kalo sekaligus takutnya respon bot malah kurang responsive jadi cukup pilih 1 saja, ya g ush merasa kurang puas ajh gitu 
 *
 * kalo kamu run bot di tempat yang konsisten 1 ip atau ip nya sering ga berubah berubah,
 * atau kamu ada tempat run bot yang kaya panel atau vps yang awet yah monggo ajh 
 *
 * tapi kalo kamu run bot nya ga konsisten misalnya dalam beberapa hari atau seminggu sskali sering gonta ganti server panel atau vps atau yg lainnya
 * nah itukan berarti ya ip nya ganti ganti donk, nah sebagai yang kita tau bahwa monggo db cuma izinkan koneksinya yang ipnya itu udh di list ke monggo nya, 
 * jadi github db atau firebase atau (google drive ada limit per day keknya) lebih rekomen sih karna kita tidak perlu harus ngelist dulu ip address tempat run bot kita   
 **/

/* nyalain .on autobackup matiion off autobackup, kalo error kamu salah masukin info password dan url nya matiin ajh sampe masukinya bener bener bener ga ada info error dari monggo nya */
if (!backup_mongo) {
   //console.log('Autobackup Disable');
} else if (backup_mongo) {
   const test_file = false // if autobackup no need to save test , if true test file will database-test.json
   const alert = true
   const alert_info = '✅‎ Backed Up'   
   MongoDB(url, file_restore, backup, restore, { alert, alert_info, test_file });
};
module.exports = { backupMongo , restoreMongo }
/** TUTORIAL **/
/** 
 * Di Baca Saya Ajarin Sampai Bisa ini pake bahasa Indonesia yah bukan bahasa lain kalo tidak ngerti juga keterlaluan banget , IQ nya rendah kali peace ✌ 😄 
 * pas daftar di suruh bikin cluster pilih geser yang paling kanan yang free
 * password database monggo
 * gimana cara menemukan nya? kalian pergi ke Project
 * di Security click Database Access 
 * jika masih kosong buat saja klik create
 * jika sudah ada klik Edit => Edit Password => klik AutoGenerate  Secure Password (terus salin!) => terus paling bawah klik tombol ijo Update User
 * generate and dan salin dan tempel ke yang di const password itu
 * Next 
 * cara mencari url monggo db kamu
 * click Cluster0 lalu click Connect
 * lalu click Driver
 * dan kamu akan melihat url monggo kamu seperti contoh di atas lalu salin
 * ganti <dbpassword> dengan password ${password} contohnya di atas
 * terakhir kamu harus setting ip address kamu di mongo db nya 
 * di bagian Security (Network Access) dan setel ip panel atau vps kalian disitu
 * kalo g tau ipnya gimana bang ?
 * nah di bot kalian ketik .myip atau .ip 
 * setelah itu muncul langsu copy dan masukan
 * ke klik +add ip address lalu masukan ip nya ke Access List Entry
 * bagian Comment nya isi apa ajh misalnya ip panel ku  
 * dan jika sudah selesai semua kalian bisa jalankan fitur .backup untuk backup database.json nya ke monggo db dan .restore untuk ambil database yang telah di backup
 * hasil backup bisa kalian lihat di Deployment klik Database => Browse Collections => klik datas => dan lihat Query Results: 1-1 of 1 => klik _id => ubah tanda panahnya ke bawah 🔽 dan taraaaa itu database nya.. sekian
 * Masih Belum Bisa? ulangin lagi karena urutannya memang begitu sabar ajh pelan pelan
 **/