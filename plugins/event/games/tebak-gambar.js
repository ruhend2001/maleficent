let rewards = {
   limit: 10,
   uang: 20
}
let mistaken = Math.floor(Math.random() * 3);
let message = ['💩 Salah', '🐽 Kurang Tepat', '🍌 Belum Benar'][mistaken];

module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && budy && !m.isBaileys) {
         let jawaban = tebakgambar[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            conn.adReply(m.chat, `Benar 🌈\nkamu mendapatkan:\nLimit +${rewards.limit}\nUang +${rewards.uang} `, setting.thumbnail, m)
            db.users[m.sender].limit += rewards.limit
            db.users[m.sender].uang += rewards.uang                    
            delete tebakgambar[m.sender.split('@')[0]];
            console.log(tebakgambar);
         } else {
            return conn.adReply(m.chat, message, setting.thumbnail, m)
         }
      }
   }
};
