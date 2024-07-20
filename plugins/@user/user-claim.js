export default {
   names: ['User Menu'],
   tags: ['claim'],
   command: ['claim', 'daily'],
   start: async (m, {
      conn,
      User
   }) => {
      try {
         let give = 25;         
         let remainingTime = await User.confirmclaim(m.sender, give);
         if (typeof remainingTime === "number" && !m.fromMe) {
            return m.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
         } else {
            if (!m.fromMe) {
               let b1 = ['Tukar Kupon', '.tukarkupon'];
               let Claim = `Claim berhasil. Kamu dapat ${give} Limit\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`
               await m.adReply(Claim, setting.thumbnail, m.chat);
               conn.sendButton(m.chat, setting.thumbnail, '', b1, m);
            }
         }
      } catch (error) {
         return m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};
