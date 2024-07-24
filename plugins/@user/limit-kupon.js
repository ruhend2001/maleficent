exports.default = {
   names: ['User Menu'],
   tags: ['tukarkupon', 'kupon'],
   command: ['tukarkupon', 'kupon'],
   start: async (m, {
      conn,
      text,
      User      
   }) => {      
      if (!text) return m.reply(`Masukkan Parameter contoh: .tukarkupon 1\n\nKupon Kamu Tersisa ${User.getProfileData(m.sender).kupon}`);
      if (User.cekkupon(m.sender)) return m.reply(`Kupon kamu tidak cukup atau habis untuk menukar kupon ke limit\nsilahkan bayar hutang kupon kalo minus punya hutang\nketik .claimkupon untuk mendapatkan kupon\natau Ketik .my untuk cek sisa kupon`);
      let deduct, upgrade;
      if (/^[1-9]\d*$/.test(text)) {
         let jumlahKupon = parseInt(text);
         let jumlahLimit = jumlahKupon * 20; //20 limit per 1 kupon
         deduct = { kupon: jumlahKupon};
         upgrade = { limit: jumlahLimit };
         await User.dbMinus(m.sender, deduct);
         await User.dbPlus(m.sender, upgrade);
         conn.adReply(m.chat, `Kamu berhasil mendapat ${jumlahLimit} limit dengan menukar ${jumlahKupon} kupon`, cover, m);
      } else {
         return m.reply(`Masukkan parameter angka yang valid`);
      }
   },
   register: true
};
