//const cron = require('node-cron');
const ms = require('ms');
const http = require('http');
const caller = (conn) => {
   conn.ws.on('CB:call', (update) => {
      const call = update.content[0].attrs['call-creator']; console.log(call);
      if (!global.anticall) return false
      if (setting.ownerNumber.includes(call.split('@')[0])) return false
      const text = 'Kamu Telah Melanggar Ketentuan\nDilarang Menelepon Bot'
      conn.sendMessage(call, { text: text }, { ...conn.connect }).then(() => {
         conn.updateBlockStatus(call, 'block');
      })
   })
};
exports.caller = caller;
/*
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
const isFiltered = (from) => {
   return !!usedCommandRecently.has(from)
};
exports.isFiltered = isFiltered;
const addFilter = (from) => {
   usedCommandRecently.add(from)
   setTimeout(() => {
      return usedCommandRecently.delete(from)
   }, 3000); // Delay Spam Every 3 Second
};
exports.addFilter = addFilter;
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
exports.addSpam = addSpam;
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
exports.ResetSpam = ResetSpam;
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
exports.isSpam = isSpam;
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080
const server = http.createServer((req, res) => {   
   res.setHeader("Content-Type", "application/json");
   res.end(JSON.stringify(setting, null, 2))   
});
server.listen(PORT); 
console.log("Server listen on port", PORT);
//line of database
global.db_line = 'multi-line' // or 'single-line'
// plugins status adalah model pesan pada file file plugins seperti model pesan limit seperti itu kamu bisa kostum sendiri
global.plugins_status = (conn, jid, msg, m) => conn.adReply(jid, msg, cover, m);
global.caklontong = {}, caklontong_desc = {}, boom = {}, family100 = {}, tebakkata = {}, tekateki = {}, tictactoe = {}, gift = {}, kuismath = {}, siapakahaku = {}, susunkata = {}, tebakbendera = {}, tebakgambar = {}, tebakgame = {}, tebakkalimat = {}, tebaktebakan = {};
const fake_wa = {
   key: {
      remoteJid: '0@s.whatsapp.net',
      fromMe: false,
      id: 'CAKLONTONG'
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
// sesuaikan jadwal daerah kalian masing masing
const prayerTimes = {
   '04:37': 'Subuh',
   '11:57': 'Zuhur',
   '15:13': 'Ashar',
   '17:47': 'Maghrib',
   '19:10': 'Isya'
};
global.prayerTimes = prayerTimes;
/** simple connections dan fungsi koneksi lainya kalo mau bikin **/
exports.connections = (conn) => {   
   conn.sendMystery = (jid) => {
      return conn.sendMessage(jid, { image: { url: 'https://files.catbox.moe/u5rmu8.jpg' }, caption: 'Mystery Box Tiba\nAda Hadiah Nih\nSilahkan balas *open*' }, { ...conn.connect, quoted: fake_wa })
   };
   conn.sendPrayer = (jid, time) => {
      const caption = `*Waktu ${time} Telah Tiba Silahkan Ambilah Air Wudhu Dan Segera Laksanakan Sholat*\n`
       //+ `*Untuk Yang Kafir, Atheis, Komunis Semoga Cepet Sadar Dan Dapat Hidayah Amin*`;
      return conn.reply(jid, caption, fake_wa, { ...conn.connect });            
   };
}