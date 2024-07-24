let rewards = {
   limit: 10,
   uang: 35
}

module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebaktebakan') && !budy.includes('.tebakan') && !m.isBaileys) {
         let jawaban = tebaktebakan[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            conn.adReply(m.chat, `Tebak Tebakan 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tebaktebakan[m.sender.split('@')[0]]
         } else {
            return conn.adReply(m.chat, 'salah', setting.thumbnail, m);
         }
      }
   }
};