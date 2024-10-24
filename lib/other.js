const fs = require('fs'), comp = require('utils-mf');
global.Format = comp.Format;
global.Connect = comp.Connect;
global.mess = comp.mess_JSON;
global.setting = comp.setting_JSON;
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
const _load = [ mess.wait, load1, load2, load3, load4 ]
global.loading = pickRandom(_load);
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
fs.loadFileSync(require.resolve(__filename));