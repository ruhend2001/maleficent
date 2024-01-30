export default {
   names: ['User Menu'],
   tags: ['transferlimit'],
   command: ['transferlimit', 'tflimit'],
   start: async (m, {
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) {
         return m.reply(`Masukkan Parameter contoh: ${prefix+command} 62xxxx 5`);
      } else if (User.checkLimitUser(m.sender) <= 4) {
         return m.reply(`Gagal Transfer Pastikan Limit Kamu Masih Mencukupi Minimal Transfer Limit Adalah 5 ketik .limit untuk cek limit`);
      };
      let [number, limit] = text.split(" ");
      let num = number + "@s.whatsapp.net";
      let give = parseInt(limit);
      let deduct = {
        limit: give
      };
      let upgrade = {
        limit: give
      };
      await Promise.all([User.dbMinus(m.sender, deduct), User.dbPlus(num, upgrade)]);
      m.adReply(`Kamu berhasil transfer ${give} limit ke nomor ${number}`, setting.thumbnail, m.chat)
   }
};