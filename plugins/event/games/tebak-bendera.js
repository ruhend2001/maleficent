let rewards = {
   limit: 25,
   uang: 50
}

module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (tebakbendera.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakbendera') && !m.isBaileys) {
         let jawaban = tebakbendera[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            db.users[m.sender].limit += rewards.limit
            db.users[m.sender].uang += rewards.uang
            conn.adReply(m.chat, `🎮 Tebak Bendera \n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tebakbendera[m.sender.split('@')[0]]
         } else {
            return m.reply('Salah')
         }
      }
   }
};