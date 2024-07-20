export default {
   names: ['User Menu'],
   tags: ['claimuang'],
   command: ['claimuang'],
   start: async (m, {
      User
   }) => {
      try {
         let give = 100;
         let remainingTime = await User.Uang(m.sender, give);
         if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim uang sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim uang kembali.`);
         } else {
            var ClaimU = `Claim Uang berhasil. Kamu dapat ${give} Uang\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`
            m.adReply(ClaimU, setting.thumbnail, m.chat)
         }
      } catch (error) {
         m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};