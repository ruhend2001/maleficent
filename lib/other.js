//const cron = require('node-cron');
const ms = require('ms');
const http = require('http');
exports.database = (m, pushname, isOwner, groupId, groupName, groupDesc) => {
   const users = global.db?.users[m.sender] ? global.db?.users[m.sender] : global.db.users[m.sender] = {};
   if (Object.keys(users).length < 1) {
      global.db.users[m.sender] = {
         name: pushname,
         registered: false,
         registeredTime: '',
         umur: '',
         seri: '',
         premium: false,
         premiumTime: '',
         banned: false,
         bannedReason: '',
         limit: isOwner ? 5000 : 15,
         kupon: 5,
         uang: 1000,
         hitCmd: 0,
         notes: '',
         lastClaim: '',
         lastHour: '',
         lastUang: '',
         lastKupon: '',
         lastSpin: '',
         spin: 10,
         is_spin: false,
         afkTime: -1,
         afkReason: '',
         chat_ai: false
      }
   };
   const groups = global.db.chats[groupId] ? global.db.chats[groupId] : global.db.chats[groupId] = {};
   if (Object.keys(groups).length < 1) {
      global.db.chats[groupId] = {
         name: groupName,
         welcome: true,
         antilink: true,
         mute: false,
         absen: false,
         absen_count: 0,
         absen_user: [],
         absen_text: '',
         viewOnce: true,
         antiToxic: true,
         antiPhoto: false,
         antiBot: false,
         chat_ai: false,
         tagsw: true,
         description: groupDesc == undefined ? '' : groupDesc,
         welcomeCaption: global.group_welcome || '',
         byeCaption: global.group_bye || ''
      }
   };
   if (global.db.chats['']) delete global.db.chats[''];
   const settings = global.db.settings ? global.db.settings : global.db.settings = {};
   if (Object.keys(settings).length < 1) {
      global.db.settings = {
         menu_type: 2,
         prefix: 'multi',
         cover: setting.thumbnail,
         status: 0,
         readsw: true,
         antispam: true,
         block_pc: false,
         auto_bio: true,
         auto_down: false,
         auto_sticker: false,
         auto_clear_chat: false
      }
   };
   if (typeof global.db.menfess !== 'object') global.db.menfess = {}
   if (!('stores' in global.db)) global.db.stores = {}
   if (typeof global.db.stores !== 'object') global.db.stores = {}
};
/* ga ush di reset link nya biarin ajh dia main game atau carabuat dapetin limit udh di sediain di fitur game atau yg lain, kao di reset ke enakan nantinya udh gratis g tau diri, biar supaya mereka juga beli limit di kalian 
cron.schedule('0 23 * * *', () => {   
   const list = Object.entries(global.db.users);
   list.forEach(([data, user]) => {
      if (user.registered) user.limit += 5
      if (!user.registered) user.limit = 15
   });   
   const caption = `Berhasil Mereset 15 Limit Ke Setiap Pengguna\n`;
   caption += `Dan Berhasil Menambah 5 Limit Ke Pengguna Terdaftar\n`;
   console.log(caption);
}, {
   timezone: "Asia/Jakarta"
});
*/
const usedCommandRecently = new Set();
exports.isFiltered = (from) => {
   return !!usedCommandRecently.has(from)
};
exports.addFilter = (from) => {
   usedCommandRecently.add(from)
   setTimeout(() => {
      return usedCommandRecently.delete(from)
   }, 3000); // Delay Spam Every 3 Second
};
exports.addSpam = (sender, _db) => {
   let position = false
   Object.keys(_db).forEach((i) => {
      if (_db[i].id === sender) {
         position = i
      }
   })
   if (position !== false) {
      _db[position].spam += 1
   } else {
      const bulin = ({
         id: sender,
         spam: 1,
         expired: Date.now() + ms('10m')
      })
      _db.push(bulin)
   }
};
exports.getAdmins = async (m, conn, groupMetadata, participants) => {
   const admin = [];
   for await (let user of await conn.getAdmins(m, groupMetadata, participants)) {      
      const data = await m.jid(user);
      admin.push(data)
   };
   return admin;
};
exports.ResetSpam = (_dir) => {
   setInterval(() => {
      let position = null
      Object.keys(_dir).forEach((i) => {
         if (Date.now() >= _dir[i].expired) {
            position = i
         }
      })
      if (position !== null) {
         // console.log(`Spam expired: ${_dir[position].id}`)
         _dir.splice(position, 1)
      }
   }, 1000)
};
exports.isSpam = (sender, _db) => {
   let found = false
   for (let i of _db) {
      if (i.id === sender) {
         let spam = i.spam
         if (spam >= 6) {
            found = true
            return true
         } else {
            found = true
            return false
         }
      }
   }
};
const PORT = process?.env?.PORT || process?.env?.SERVER_PORT || 8080
const server = http.createServer((req, res) => {   
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(setting, null, 2))   
});
server.listen(PORT), console.log('server listen on port:', PORT);
// line of database
global.db_line = 'multi-line' // or 'single-line'
// plugins status adalah model pesan pada file file plugins seperti model pesan pesan di file message.js seperti itu, kamu bisa kostum sendiri default nya seperti contoh di bawah menggunakan conn.adReply, jika mau yang bawaan nya ya silahkan g ush di ganti g masalah
global.plugins_status = async (conn, jid, msg, m) => await conn.adReply(jid, msg, cover, m);
global.caklontong = {}, caklontong_desc = {}, boom = {}, family100 = {}, tebakkata = {}, tekateki = {}, tictactoe = {}, gift = {}, kuismath = {}, siapakahaku = {}, susunkata = {}, tebakbendera = {}, tebakgambar = {}, tebakgame = {}, tebakkalimat = {}, tebaktebakan = {};
const fake_wa = {
   key: {
      remoteJid: '0@s.whatsapp.net',
      fromMe: false,
      id: 'CAK_LONTONG'
   },
   pushName: 'WhatsApp',
   broadcast: true,
   message: {
      extendedTextMessage: {
         text: global.namebot,
         contextInfo: {            
            mentionedJid: ["0@s.whatsapp.net"],
            remoteJid: "0@s.whatsapp.net",           
         }
      }
   }
};
global.fake_wa = fake_wa;
global.baileys_bot = ["Z4PH","ILSYM","NARUYA","7EPP","SUK","SANKA","TIX","IZUMI","24","AD","META","RMC","Laurine","FTG","RYZEN","Fiz","SSA","FELZ","BAE5","3EB0","B1EY","NXR","AKIRA"];
// sesuaikan jadwal daerah kalian masing masing
const prayerTimes = {
   '04:37': 'Subuh',
   '11:57': 'Zuhur',
   '15:13': 'Ashar',
   '17:47': 'Maghrib',
   '19:10': 'Isya'
};
global.prayerTimes = prayerTimes;
/** simple connections **/
exports.connections = (conn) => {   
    conn.ws.on('CB:call', (update) => {
       const call = update.content[0].attrs['call-creator']; console.log(call);
       if (!global.anticall) return null
       if (setting.ownerNumber.includes(call.split('@')[0])) return null
       const text = 'Kamu Telah Melanggar Ketentuan\nDilarang Menelepon Bot';
       return conn.sendMessage(call, { text: text }, { ...conn.connect }), conn.updateBlockStatus(call, 'block');
   });
   conn.sendMystery = (jid) => {
      return conn.sendMessage(jid, { image: { url: 'https://files.catbox.moe/u5rmu8.jpg' }, caption: 'Mystery Box Tiba\nAda Hadiah Nih\nSilahkan balas *open*' }, { fileLength: 1024, ...conn.connect, quoted: fake_wa });
   };
   conn.sendPrayer = (jid, time) => {
      const caption = `*Waktu ${time} Telah Tiba Silahkan Ambilah Air Wudhu Dan Segera Laksanakan Sholat*\n`
       //+ `*Untuk Yang Kafir, Atheis, Komunis Semoga Cepet Sadar Dan Dapat Hidayah Amin*`;
      return conn.reply(jid, caption, fake_wa, { ...conn.connect });            
   };
}