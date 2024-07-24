let rewards = {
   limit: 15,
   uang: 30
}

module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (tekateki.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tekateki') && !m.isBaileys) {
         let jawaban = tekateki[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            conn.adReply(m.chat, `Teka Teki 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tekateki[m.sender.split('@')[0]]
         } else {
            return m.reply('salah');
         }
      }
   }
};