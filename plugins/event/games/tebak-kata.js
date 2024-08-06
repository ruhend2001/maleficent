let rewards = {
   limit: 20,
   uang: 40
}
let kat = Math.floor(Math.random() * 3);
let ta = ['Salah', 'Kurang Tepat', 'Belum Benar'][kat];

module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakkata') && !budy.includes('.teka') && !m.isBaileys) {
         let jawaban = tebakkata[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            db.users[m.sender].limit += rewards.limit
            db.users[m.sender].uang += rewards.uang
            conn.adReply(m.chat, `🎮 Tebak Kata 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tebakkata[m.sender.split('@')[0]]
         } else {
            return m.reply(ta)
         }
      }
   }
};