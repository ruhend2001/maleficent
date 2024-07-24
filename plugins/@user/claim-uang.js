exports.default = {
   names: ['User Menu'],
   tags: ['claimuang'],
   command: ['claimuang'],
   start: async (m, {
      conn,
      User
   }) => {
      try {
         let give = 250;
         let remainingTime = await User.Uang(m.sender, give);
         if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim uang sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim uang kembali.`);
         } else {
            const ClaimU = `Claim Uang berhasil. Kamu dapat ${give} Uang\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`
            conn.adReply(m.chat, ClaimU, cover, m, {
               showAds: true
            })
         }
      } catch {
         return m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};