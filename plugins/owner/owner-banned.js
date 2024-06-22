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
      if (!text) return m.reply(`Masukkan Nomor dan alasan nya Contoh: ${prefix+command} nomor(spasi)alasan\nContoh: ${prefix+command} 62xxxxx karena dia toxic atau menghina bot`);
      let [number, ...reason] = text.split(" ");
      if (!reason.length) return m.reply(`Masukan Alasannya \nContoh: ${prefix+command} nomor(spasi)alasan\nContoh: ${prefix+command} 62xxxxx karena dia toxic atau menghina bot`)
      let num = number + '@s.whatsapp.net';
      User.addBannedUser(num, true);
      User.bannedReason(num, reason.join(" "));
      m.reply(`Nomor ${num} berhasil di banned\nSekarang Nomor Itu Tidak Bisa Menggunakan Bot Ini\nAlasan Di Banned:\n${reason.join(" ")} \nUntuk melihat daftar banned ketik .listbanned`);
   },
   owner: true
};
