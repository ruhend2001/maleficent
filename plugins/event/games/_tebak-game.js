let rewards = {
   limit: 25,
   uang: 50
}
module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (tebakgame.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakgame') && !m.isBaileys) {
         let jawaban = tebakgame[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            conn.adReply(m.chat, `🎮 Tebak Game \n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tebakgame[m.sender.split('@')[0]]
         } else {
            return conn.adReply(m.chat, 'Salah ❎', setting.thumbnail, m);
         }
      }
   }
};