export default {
   names: ['User Menu'],
   tags: ['claim'],
   command: ['claim', 'daily'],
   start: async (m, {
      User
   }) => {
      try {
         let give = 25;
         let remainingTime = await User.confirmclaim(m.sender, give);
         if (typeof remainingTime === "number" && !m.fromMe) {
            return m.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
         } else {
            if (!m.fromMe) {
               var Claim = `Claim berhasil. Kamu dapat ${give} Limit\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`
               m.adReply(Claim, setting.thumbnail, m.chat)
            }
         }
      } catch (error) {
         m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};