export default {
   names: ['User Menu'],
   tags: ['claimkupon'],
   command: ['claimkupon'],
   start: async (m, {
      User
   }) => {
      try {
         let give = 5;
         let remainingTime = await User.Kupon(m.sender, give);
         if (typeof remainingTime === "number") {
            return m.reply(`Kamu sudah melakukan claim kupon sebelumnya. Tunggu ${remainingTime} jam lagi sebelum dapat melakukan claim kupon kembali.`);
         } else {
            var ClaimK = `Claim Kupon berhasil. Kamu dapat ${give} Kupon\nKamu Bisa melakukan claim lagi dalam 72 jam mendatang.\n\nJika Ingin Tukar Ke Limit Contoh Penggunaannya: \n.tukarkupon 1 \n\nLihat Ada Berapa Kupon Kamu Berapa Banyak Bisa Di Tukar Ke Limit Ketik .me`
            m.adsReply(ClaimK, setting.thumbnail, m.chat)
         }
      } catch (error) {
         m.reply("Data pengguna tidak ditemukan.");
      }
   },
   register: true
};
