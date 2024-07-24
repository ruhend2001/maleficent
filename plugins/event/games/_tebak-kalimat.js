let rewards = {
   limit: 20,
   uang: 50
}
let kal = Math.floor(Math.random() * 3);
let imat = ['Salah', 'Kurang Tepat ', 'Belum Benar '][kal];

module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakkalimat') && !m.isBaileys) {
         let jawaban = tebakkalimat[m.sender.split('@')[0]].trim();
         if (budy.toLowerCase() === jawaban) {
            User.dbPlus(m.sender, rewards);
            conn.adReply(m.chat, `Jawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m);
            delete tebakkalimat[m.sender.split('@')[0]]
         } else {
            return conn.adReply(m.chat, imat, setting.thumbnail, m)
         }
      }
   }
};