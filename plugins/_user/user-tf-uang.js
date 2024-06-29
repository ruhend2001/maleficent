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
         return m.reply(`Masukkan nomor atau tag dan nilai uang yang mau di transfer\ncontoh: ${prefix+command} 62xxxx 50\nAtau\ncontoh: ${prefix+command} @tag 50`);
      } else if (User.checkUangUser(m.sender) <= 49) {
         return m.reply(`Gagal Transfer Pastikan Uang Kamu Masih Mencukupi Minimal Transfer Uang Adalah 50 ketik .my untuk cek sisa uang`);
      };
      let number = text.split(" ")[0]
      let uang = text.split(" ")[1]
      if (!uang) return m.reply(`Masukkan nilai uang yang mau di transfer\ncontoh: ${prefix+command} 62xxxx 50\nAtau\ncontoh: ${prefix+command} @tag 50`);
      let num = `${number.replace("@", "").trim()}@s.whatsapp.net`      
      let give = parseInt(uang);
      let deduct = { uang: give };
      let upgrade = { uang: give };      
      await Promise.all([await User.dbMinus(m.sender, deduct), await User.dbPlus(num, upgrade)]);
      m.adReply(`Kamu berhasil transfer ${give} uang ke nomor ${num.split('@')[0]}`, setting.thumbnail, m.chat)
   }
};
