export default {
   names: ['Owner'],
   tags: ['banned', 'ban'],
   command: ['banned', 'ban'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx`);
      let usernya = `${text}@s.whatsapp.net`
      User.addBannedUser(usernya, true);
      m.reply(`Nomor ${usernya} berhasil di banned\nSekarang Nomor Itu Tidak Bisa Menggunakan Bot Ini`);
   },
   owner: true
};