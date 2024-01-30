export default {
   names: ['User Menu'],
   tags: ['transferuang'],
   command: ['transferuang', 'tfuang'],
   start: async (m, {
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) {
         return m.reply(`Masukkan Parameter contoh: ${prefix+command} 62xxxx 50`);
      } else if (User.checkUangUser(m.sender) <= 49) {
         return m.reply(`Gagal Transfer Pastikan Uang Kamu Masih Mencukupi Minimal Transfer Uang Adalah 50 ketik .my untuk cek sisa uang`);
      };
      let [number, limit] = text.split(" ");
      let num = number + "@s.whatsapp.net";
      let give = parseInt(limit);
      let deduct = {
        uang: give
      };
      let upgrade = {
        uang: give
      };
      await Promise.all([User.dbMinus(m.sender, deduct), User.dbPlus(num, upgrade)]);
      m.adReply(`Kamu berhasil transfer ${give} uang ke nomor ${number}`, setting.thumbnail, m.chat)
   }
};