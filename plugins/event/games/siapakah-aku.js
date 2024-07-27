let rewards = {
   limit: 20,
   uang: 40
}
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (siapakahaku.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.siapakahaku') && !budy.includes('.siapaaku')&& !m.isBaileys) {
         let jawaban = siapakahaku[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            conn.adReply(m.chat, `Benar 🎊 \nkamu mendapatkan:\n+ ${rewards.limit} limit 🎟\n+ ${rewards.uang} uang 💵`, setting.thumbnail, m)
            db.users[m.sender].limit += rewards.limit
            db.users[m.sender].uang += rewards.uang
            delete siapakahaku[m.sender.split('@')[0]];
            console.log(siapakahaku);
         } else {
            return m.reply('❎ Salah');
         }
      }
   }
};