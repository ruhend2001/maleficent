const fs = require('fs'), general = require('utils-mf');
global.Format = general.Format;
global.Connect = general.Connect;
global.mess = general.mess_JSON;
global.setting = general.setting_JSON;
global.config = setting;
global.autodl = setting.auto_dl;
global.namebot = setting.botName;
global.wm = `By ${setting.footer}`
global.footer = setting.footer;
global.cover = setting.thumbnail;
const load1 = 'Sabakh...'
const load2 = 'Tunggu Sebentar...'
const load3 = 'Hold On...'
const load4 = 'Tahan...'
const load = [mess.wait, load1, load2, load3, load4]
global.loading = pickRandom(load);
global.ed = [
   " █▒▒▒▒▒▒▒▒▒10%",
   " ██▒▒▒▒▒▒▒▒20%",
   " ███▒▒▒▒▒▒▒30%",
   " ████▒▒▒▒▒▒45%",
   " █████▒▒▒▒▒50%",
   " ███████▒▒▒75%",
   " █████████▒95%",
   " ██████████100%",
   " ██████████100%"
]
/**
 * m.edReply("lasttext", delay)
 * example m.edReply("Done!", 500)
 **/
global.java = '⭔'
global.javi = '⬣'
global.star = '✨'
global.zw = 'ㄊ'
global.logo_premium = 'Ⓟ'
global.logo_limit = 'Ⓛ'
global.gcbot = 'http://surl.li/qgkhyu'
global.hyd_gcbot = ['Join group', gcbot]
// untuk owner limit akan tetap di kenakan fitur .addlimit dan lainya biar ga lupa ajah cheat ajh .addlimit nomormu 999999
global.limit_message = "🐽 %limit Limit Terpakai √"
// games
global.caklontong = {}
global.caklontong_desk = {}
global.family100 = {}
global.kuismath = {}
global.siapakahaku = {}
global.susunkata = {}
global.tebakbendera = {}
global.tebakgambar = {}
global.tebakgame = {}
global.tekateki = {}
global.tebaktebakan = {}
global.tebakkata = {}
global.tebakkalimat = {}
global.tictactoe = {}
global.boom = {}
/**
 * groupMode owner and premium allowed 
 * if wanna active change in config.json group.only = true
 * or type .setgcmode on
 **/
global.groupMode = setting.group.only;
global.imgload = 'https://qu.ax/MiAx.jpeg'
global.auto_backup = false
global.defaultDatabase = {
   users: {},
   chats: {},
   settings: {},
   ...(global.db || {})
};
const hour = 23
const minute = 00
const newLimit = () => {
   try {
      const now = new Date();
      const options = {
         timeZone: 'Asia/Jakarta',
         hour: '2-digit',
         minute: '2-digit',
         hour12: false
      };
      const indonesianTime = now.toLocaleString('en-US', options);
      const [currentHour, currentMinute] = indonesianTime.split(':').map(Number);
      const limitToAdd = 25
      if (currentMinute === minute && currentHour === hour) {
         let list = Object.entries(global.db.users);
         list.forEach(([user, data]) => {
            data.limit += limitToAdd;
         });
         let caption = `Berhasil Menambah Limit ${limitToAdd} ke setiap pengguna\n`;
         console.log(caption);
      } else {
         return console.log('Time Not Yet');
      }
   } catch (e) {
      console.log('Failed To Execute Add Limit\n', e)
   }
};
const scheduleNewLimit = () => {
   const now = new Date();
   const targetHour = hour;
   const targetMinute = minute;
   const targetTime = new Date();
   targetTime.setHours(targetHour, targetMinute, 0, 0);
   if (now > targetTime) targetTime.setDate(targetTime.getDate() + 1);
   const timeUntilNextRun = targetTime - now;
   setTimeout(() => {
      newLimit();
      console.log('New Limit Executed')
      scheduleNewLimit();
      console.log('Do Next schedule For New Limit');
   }, timeUntilNextRun);
};
scheduleNewLimit();
fs.loadFileSync(require.resolve(__filename));