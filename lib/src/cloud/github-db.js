const { GithubDB } = require('utils-mf');
/** Ganti dengan username gitHub kamu **/
const USER_NAME = 'username' 
/** buat token atau generate github token cari tutorial nya di google atau youtube, masih g bisa juga atau butban email contact rulihenderson@gmail.com **/
/** di bawah contoh dan ganti dengan token clasic github kamu centang semua ya pas buat atau generate token baru agar tidak error dan set no expired **/
const GITHUB_TOKEN = 'YOUR GITHUB TOKEN' 
const options = {   
   USER_NAME: USER_NAME,  
   DEFAULT_DB: global.default_db,
   GITHUB_TOKEN: GITHUB_TOKEN,
   ASSIGN_TO_DB: {
      VALUE: true,
      DATA: global.db || global.default_db
   },
   WRITE: true,
   LOG: {
      VALUE: true,
      SUCCESS: 'Backed Up ✅‎'
   }
};
const backupGithub = async () => await GithubDB.Backup(options);
const restoreGithub = async () => await GithubDB.Restore(options);
if (backup_github) {
   console.log('AutoBackup Github Aktif');
   GithubDB.AutoBackup(options)
} else if (!backup_github) {
   //console.log('AutoBackup Github Nonaktif');
};
module.exports = { 
   backupGithub,
   restoreGithub
};
/* 
 * untuk melihat hasil jika sukses salin dan buka 
 * https://github.com/gantiusernamekamu/database 
 **/