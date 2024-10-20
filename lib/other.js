const { setting_JSON, mess_JSON } = require('utils-mf')
const { watchFile } = require('fs')
const chalk = require ('chalk')
global.mess = mess_JSON;
global.setting = setting_JSON;
global.config = setting;
global.autodl = setting.auto_dl
global.namebot = setting.botName;
global.wm = `By ${setting.footer}`
global.footer = setting.footer;
global.cover = setting.thumbnail;
let l1 = 'Sabakh...'
let l2 = 'Tunggu Sebentar...'
let l3 = 'Hold On...'
let l4 = 'Tahan...'
let load = [ mess.wait, l1, l2, l3, l4 ]
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
// untuk owner limit akan tetap di kenakan fitur .addlimit dan lainya biar ga lupa ajah cheat ajh .addlimit nomormu 999999
global.limit_message = "🐽 %limit Limit Terpakai √"
/**/
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
 */
global.groupMode = setting.group.only;
global.imgload = 'https://qu.ax/MiAx.jpeg' 
global.auto_backup = false
global.defaultDatabase = { 
   users: {},
   chats: {},
   settings: {},
   ...(global.db || {})
};
let file = require.resolve(__filename)
watchFile(file, () => {
   console.log(chalk.redBright(`Updated ${__filename}`))
   delete require.cache[file]
   require(file)
});
