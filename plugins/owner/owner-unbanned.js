export default {
   names: ['Owner'],
   tags: ['unbanned', 'unban'],
   command: ['unbanned', 'unban'],
   start: async (m, {
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx`);
      let user = `${text}@s.whatsapp.net`
      User.addBannedUser(user, false);
      m.reply(`Nomor ${user} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini`);
   },
   owner: true
};