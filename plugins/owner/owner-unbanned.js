exports.default = {
   names: ['Owner'],
   tags: ['unbanned', 'unban'],
   command: ['unbanned', 'unban'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx \n\nkamu bisa lihat di .listbanned\n\nterus salin nomornya lalu tempel`);      
      const Number = text.replace(/[@+\s-]/g, '');
      const num_1 = m.jid(Number+'@lid')      
      const user = num_1.endsWith('net') ? num_1 : Number + '@s.whatsapp.net'     
      db.users[user].banned = false
      db.users[user].bannedReason = ''
      m.reply(`Nomor ${user.split('@')[0]} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini\nUntuk melihat daftar banned ketik .listbanned`);
   },
   admin: true
}