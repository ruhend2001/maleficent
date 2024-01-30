export default {
   names: ['User Menu'],
   tags: ['hour'],
   command: ['hour'],
   start: async (m, {
      User
   }) => {
      try {
         let hourly = 10;
         const remainingTime = await User.Hour(m.sender, hourly);
         if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim dalam 1 jam terakhir. Tunggu ${remainingTime} menit lagi sebelum dapat melakukan claim kembali.\nkamu juga bisa claim uang  ketik .claimuang`);
         } else {
            var ClaimH = `Claim Perjam berhasil. Kamu mendapatkan ${hourly} Limit. Kamu bisa melakukan claim lagi dalam 1 jam mendatang.`
            m.adsReply(ClaimH, setting.thumbnail, m.chat)
         }
      } catch (error) {
         m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};