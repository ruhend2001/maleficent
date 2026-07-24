const ms = require('ms');
const http = require('http');
const usedCommandRecently = new Set();
const isFiltered = (from) => {
   return !!usedCommandRecently.has(from)
};
const addFilter = (from) => {
   usedCommandRecently.add(from)
   setTimeout(() => {
      return usedCommandRecently.delete(from)
   }, 3000); // Delay Spam Every 3 Second
};
const addSpam = (sender, _db) => {
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
const ResetSpam = (_dir) => {
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
const isSpam = (sender, _db) => {
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
exports.handler = async (m, conn, store) => {
   const type = typeof m.message === 'object' ? Object?.keys(m.message)[0] : {};
   const budy = typeof m.text == 'string' ? m.text : '';
   const body = m.body;
   const cmd = body?.slice(1).trim().split(/ +/).shift().toLowerCase();
   const args = body?.trim().split(/ +/).slice(1);
   const text = args?.join(' ');
   const command = m.command;
   const prefix = m.prefix;
   const pushname = m.isBaileys && m.key.fromMe ? setting.botName : m.isGroup ? m.pushName : m.key.remoteJid == 'status@broadcast' ? m.pushName : m.sender.split('@')[0];
   const botNumber = conn.decodeJid(conn.user.id);
   const isMe = botNumber.split('@')[0];
   const mebot = m.isLid ? m.jid(m.sender)?.split('@')[0] : isMe
   const isOwner = m.isLid ? (setting.ownerNumber.includes(mebot) || [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`.replace(/[+-\s]/g, '')).includes(m.sender)) : [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`.replace(/[+-\s]/g, '')).includes(m.sender)
   const quoted = m.quoted ? m.quoted : m;
   const mime = m.quoted ? (m?.quoted?.mimetype || m?.quoted?.mtype) : m.mtype;
   const groupMetadata = m.isGroup ? await conn.cacheGroupMetadata(m.chat) : {};
   const groupId = m.isGroup ? groupMetadata?.id : '';
   const groupName = m.isGroup ? groupMetadata?.subject : '';
   const groupDesc = m.isGroup ? groupMetadata?.desc : '';
   const participants = m.isGroup ? groupMetadata?.participants : '';
   const groupAdmins = await conn.getAdmins(m, groupMetadata, participants);
   const groupOwner = m.isGroup ? groupMetadata?.owner : '';
   const isBotAdmins = m.isGroup ? groupAdmins?.includes(m.isLid ? m.jid(botNumber) : botNumber) : false;
   const isAdmins = m.isGroup ? groupAdmins?.includes(m.sender) : false;
   const jam = moment.tz('asia/jakarta').format('HH:mm:ss');
   const tanggal = moment().tz("Asia/Jakarta").format("ll");
   const suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
   const time = moment(new Date()).format("HH:mm");
   global.waktu = { tanggal, jam, suasana, time };
   global.cover = db.settings.cover;
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
         limit: isOwner ? 1000 : 15,
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
   if (!('community' in global.db.chats)) global.db.chats.community = {};
   if (global.db.chats['']) delete global.db.chats[''];
   const settings = global.db.settings ? global.db.settings : global.db.settings = {};
   if (Object.keys(settings).length < 1) {
      global.db.settings = {
         menu_type: 2,
         prefix: 'multi',
         cover: setting.thumbnail,
         status: 0,
         custom_tags: [],
         readsw: true,
         reactsw: true,
         antispam: true,
         block_pc: false,
         auto_bio: true,
         auto_down: false,
         auto_sticker: false,
         auto_clear_chat: false
      }
   };
   if (!('menfess' in global.db)) global.db.menfess = {}
   if (!('stores' in global.db)) global.db.stores = {}
   const isPremium = db.users[m.sender].premium || isOwner;
   const owner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`).concat(setting.ownerNumber.map(num => `${num}@lid`));
   const number = conn.decodeNum(m.sender).replace('s.whatsapp.net', '').replace('lid', '');
   const num = m.isLid ? m.fromMe ? botNumber : number + '@s.whatsapp.net' : number + '@s.whatsapp.net';
   if (db.settings.block_pc && !m.fromMe && !owner.includes(m.sender) && m.chat !== 'status@broadcast' && !m.isGroup && !isPremium && !isOwner) {
      console.log(`Private => ${m.sender.split('@')[0]}\n`, body);
      console.log(`${m.sender.split('@')[0]} Blocked From Private Chat`)
      return conn.updateBlockStatus(m.sender, 'block');
   };
   if ((db.users[num]?.banned) && !m.isBaileys && !m.fromMe) {
      if (cmd_plugins.includes(command)) {
         console.log(`${m.isGroup ? `${groupName} => ${m.chat.split('@')[0]}\n` : m.sender.split("@")[0]}\n`, body);
         return m.reply(mess.banned + `${db.users[num].bannedReason}`);
      } else {
         return console.log(mess.banned + `${db.users[num].bannedReason}`);
      }
   };
   const orang_spam = [];
   const antispam = db.settings.antispam;
   ResetSpam(orang_spam);
   if (antispam && command && isFiltered(m.sender) && !m.isBaileys && !(prefix === undefined || prefix === '')) {
      addSpam(m.sender, orang_spam);
      return m.reply(mess.spam);
   };
   if (antispam && command && args.length < 1 && !m.isBaileys) addFilter(m.sender);
   return await Connect(m, { conn, Format, prefix, command, text, mime, args, cmd, quoted, pushname, groupName, participants, groupAdmins, budy, isAdmins, isBotAdmins, isOwner, isPremium, store, time, body });  
};
const PORT = process?.env?.PORT || process?.env?.SERVER_PORT || 8080
const server = http.createServer((req, res) => {   
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(setting, null, 2))   
});
server.listen(PORT), console.log('server listen on port:', PORT);
/** plugins status adalah model pesan pada file file plugins seperti model pesan pesan di file message.js seperti itu, kamu bisa kostum sendiri default nya seperti contoh di bawah menggunakan conn.adReply, jika mau yang bawaan nya ya silahkan g ush di ganti g masalah **/
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
global.baileys_bot = ["Z4PH","ILSYM","NARUYA","7EPP","SUK","SANKA","TIX","IZUMI","24","AD","META","RMC","Laurine","FTG","RYZEN","Fiz","SSA","FELZ","BAE5","3EB0","B1EY","NXR","NEO","AKIRA"]
// sesuaikan jadwal daerah kalian masing masing
const prayerTimes = {
   '04:37': 'Subuh',
   '11:57': 'Zuhur',
   '15:13': 'Ashar',
   '17:47': 'Maghrib',
   '19:10': 'Isya'
};
global.prayerTimes = prayerTimes;
exports.connections = (conn) => {
    conn.ws.on('CB:call', async (update) => {
       const call = update.content[0].attrs['call-creator'];  
       console.log('someone calling bot:', call);
       if (!global.anticall) return null
       const { phoneNumber } = await conn.findUserId(call);
       if (setting.ownerNumber.includes(phoneNumber.split('@')[0])) return console.log('isOwner:', phoneNumber);
       const text = 'Kamu Telah Melanggar Ketentuan\nDilarang Menelepon Bot';
       return await conn.sendMessage(call, { text: text }, { ...conn.exp }), await conn.updateBlockStatus(call, 'block');
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
// ga ush di reset limit nya biarin ajh dia main game atau carabuat dapetin limit udh di sediain di fitur game atau yg lain, kao di reset ke enakan nantinya udh gratis g tau diri, biar supaya mereka juga beli limit di kalian 
/**
task(() => {   
   const list = Object.entries(global.db.users);
   list.forEach(([data, user]) => {
      if (user.registered) user.limit += 5
      if (!user.registered) user.limit = 15
   });   
   const caption = `Berhasil Mereset 15 Limit Ke Setiap Pengguna\n` +
   `Dan Berhasil Menambah 5 Limit Ke Pengguna Terdaftar\n`;
   console.log(caption);
}, '00:00');
**/
