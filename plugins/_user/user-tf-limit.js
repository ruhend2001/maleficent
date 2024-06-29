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
         return m.reply(`Masukkan nomor atau tag dan nilai limit yang mau di transfer\ncontoh: ${prefix+command} 62xxxx 5\nAtau\ncontoh: ${prefix+command} @tag 5`);
      } else if (User.checkLimitUser(m.sender) <= 4) {
         return m.reply(`Gagal Transfer Pastikan Limit Kamu Masih Mencukupi Minimal Transfer Limit Adalah 5 ketik .limit untuk cek limit`);
      };
      let number = text.split(" ")[0]
      let limit = text.split(" ")[1]
      if (!limit) return m.reply(`Masukkan nilai limit yang mau di transfer\ncontoh: ${prefix+command} 62xxxx 5\nAtau\ncontoh: ${prefix+command} @tag 5`);      
      let num = `${number.replace("@", "").trim()}@s.whatsapp.net`      
      let give = parseInt(limit);
      let deduct = { limit: give };
      let upgrade = { limit: give };
      await Promise.all([await User.dbMinus(m.sender, deduct), await User.dbPlus(num, upgrade)]);
      m.adReply(`Kamu berhasil transfer ${give} limit ke nomor ${num.split("@")[0]}`, setting.thumbnail, m.chat);
   }
};
