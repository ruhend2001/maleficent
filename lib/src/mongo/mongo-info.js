/** 
 * Jika Kamu Ingin Memakai Monggo DB sebagai Backup Penyimpanan Dan Bisa Merestore Lagi
 **/
 

/* nama file path database kamu default nya */
const file_restore = './database.json'
/* contoh password database monggo ganti disitu */
const password = 'kv8dLObQ8l3shnmt'
/* contoh url database yang di berikan monggo ganti disitu*/
const url = `mongodb+srv://myname:${password}@cluster0.shgob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`



const { backup, restore } = require('mongo-client-db');
async function Backup(data) {
   return await backup(url, data);
}

async function Restore() {
   return await restore(url, file_restore);
}

module.exports = { Backup, Restore }





/**
 * password database monggo
 * gimana cara menemukan nya? kalian pergi ke Project
 * di Security click Database Access 
 * jika masih kosong buat saja klik create
 * ikuti instruksi selanjutnya
 * dan kamu akan menemukan tulisan password dan klik password 
 * generate and dan salin dan tempel ke yang di const password itu
 **/

/**
 * cara mencari url monggo db kamu
 * di bagian Deployment click connect
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
 **/