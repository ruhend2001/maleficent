export default {
   names: ['User Menu'],
   tags: ['tukarkupon', 'kupon'],
   command: ['tukarkupon', 'kupon'],
   start: async (m, {
      text,
      User      
   }) => {      
      if (!text) return m.adReply(`Masukkan Parameter contoh: .tukarkupon 1\n\nKupon Kamu Tersisa ${User.getProfileData(m.sender).kupon}`, setting.thumbnail, m.chat);
      if (User.cekkupon(m.sender)) return m.reply(`Kupon kamu tidak cukup atau habis untuk menukar kupon ke limit\nsilahkan bayar hutang kupon kalo minus punya hutang\nketik .claimkupon untuk mendapatkan kupon\natau Ketik .my untuk cek sisa kupon`);
      let deduct;
      let upgrade;
      if (/^[1-9]\d*$/.test(text)) {
         let jumlahKupon = parseInt(text);
         let jumlahLimit = jumlahKupon * 20; //20 limit per 1 kupon
         deduct = {
            kupon: jumlahKupon
         };
         upgrade = {
            limit: jumlahLimit
         };
         await User.dbMinus(m.sender, deduct);
         await User.dbPlus(m.sender, upgrade);
         m.adReply(`Kamu berhasil mendapat ${jumlahLimit} limit dengan menukar ${jumlahKupon} kupon`, setting.thumbnail, m.chat)
      } else {
         return m.reply(`Masukkan parameter angka yang valid`);
      }
   },
   register: true
};
