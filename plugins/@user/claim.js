exports.default = {
   names: ['User Menu'],
   tags: ['claim'],
   command: ['claim', 'daily', 'hadiah'],
   start: async (m, {
      conn,
      User
   }) => {
      try {
         let give = 25;         
         let remainingTime = await User.confirmclaim(m.sender, give);
         if (typeof remainingTime === "number" && !m.isBaileys) {
            return m.reply(`Kamu sudah melakukan claim sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kembali.`);
         } else {
            if (!m.isBaileys) {
               const claim = `Claim berhasil. Kamu dapat ${give} Limit\nKamu Bisa melakukan claim lagi dalam 24 jam mendatang.`
               conn.adReply(m.chat, claim, cover, m).then(() => {         
                  conn.sendButton(m.chat, 'Ingin Tukar Kupon?', cover, m, [
                     ['Tukar Kupon', '.tukarkupon']
                  ])
               })
            }
         }
      } catch (error) {
         return m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};
