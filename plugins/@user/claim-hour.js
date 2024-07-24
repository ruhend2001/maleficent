exports.default = {
   names: ['User Menu'],
   tags: ['hour'],
   command: ['hour', 'hourly'],
   start: async (m, {
      conn,
      User
   }) => {
      try {
         const hourly = 15;
         const remainingTime = await User.Hour(m.sender, hourly);
         if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim dalam 1 jam terakhir. Tunggu ${remainingTime} menit lagi sebelum dapat melakukan claim kembali.\nkamu juga bisa claim uang  ketik .claimuang`);
         } else {
            const claim_hour = `Claim Perjam berhasil. Kamu mendapatkan ${hourly} Limit. Kamu bisa melakukan claim lagi dalam 1 jam mendatang.`
            conn.adReply(m.chat, claim_hour, cover, m)
         }
      } catch (error) {
         return m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};