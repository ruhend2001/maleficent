const os = require('os');
const clockString = (ms) => {
   const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
   const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
   const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
   const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
   return [d, ' Hari ', h, ' Jam ', m, ' Menit ', s, ' Detik '].map(v => v.toString().padStart(2, 0)).join('')
};
module.exports = {
   start: async (m, {
      conn,
      Format
   }) => {
      if (+ new Date() - db.settings.status > 1000 && db.settings.auto_bio) {
         let uptime;
         if (process.send) {
            process.send('uptime')
            uptime = await new Promise(resolve => {
               process.once('message', resolve)
               setTimeout(resolve, 1000)
            }) * 1000
         };
         const muptime = clockString(uptime)
         const emot1 = `${pickRandom(['⎔', '◈▻', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
         const emot2 = `${pickRandom(['⎔', '◈▻', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
         const emot3 = `${pickRandom(['⎔', '◈▻', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
         const emot4 = `${pickRandom(['⎔', '◈▻', '✦', '⭑', 'ᯬ', '⭔', '◉', '⬟', '᭻', '»', '〆', '々', '⛥', '✗', '⛊', '⚜', '⚝', '⚚', '♪'])}`
         const emot5 = `${pickRandom(['😨','😅','😂','😳','😎', '🥵', '😱', '🐦', '🙄', '🐤','❤️','🐦','🤨','🥴','😐','👆','😔', '👀','👎'])}`
         const bio = `${emot1} Halo ${m?.pushName || conn.authState.creds.me.name} ${emot2} Aktif Selama [ ${muptime} ] ${emot3} | Mode: ${global.group_mode ? 'Group' : 'Public'} | Self: ${setting.self ? 'Aktif' : 'Tidak'} | ${emot4} Platform: ${os.platform()} | 🟢 RAM Usage: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB | ${emot5} ${wm}`;
         if (!m.fromMe) return conn.updateProfileStatus(bio).then(() => db.settings.status = + new Date())
      }
   }
}