let rewards = {
   limit: 15,
   uang: 30
}
let miss = Math.floor(Math.random() * 3);
let wrong = ['❎ Salah', '🤯 Kurang Tepat', '🥵 Belum Benar'][miss];

module.exports = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (susunkata.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.susunkata') && !m.isBaileys) {
         let jawaban = susunkata[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            conn.adReply(m.chat, `Benar 🎊 \nkamu mendapatkan:\n+ ${rewards.limit} limit 🎟\n+ ${rewards.uang} uang 💵`, setting.thumbnail, m)
            User.dbPlus(m.sender, rewards);
            delete susunkata[m.sender.split('@')[0]];
            console.log(susunkata);
         } else {
           return conn.adReply(m.chat, wrong, setting.thumbnail, m);
         }
      }
   }
};