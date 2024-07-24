let rewards = {
   limit: 10,
   uang: 20
}
let mistaken = Math.floor(Math.random() * 3);
let message = ['💩 Salah', '🐽 Kurang Tepat', '🍌 Belum Benar'][mistaken];

module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && budy && !m.isBaileys) {
         let jawaban = tebakgambar[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            conn.adReply(m.chat, `Benar 🌈\nkamu mendapatkan:\n+Limit ${rewards.limit}\n+Uang ${rewards.uang} `, setting.thumbnail, m)
            User.dbPlus(m.sender, rewards);
            delete tebakgambar[m.sender.split('@')[0]];
            console.log(tebakgambar);
         } else {
            return conn.adReply(m.chat, message, setting.thumbnail, m)
         }
      }
   }
};
