exports.default = {
   names: ['Owner'],
   tags: ['unbanned', 'unban'],
   command: ['unbanned', 'unban'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx \n\nkamu bisa lihat di .listbanned\n\nterus salin nomornya lalu tempel`);      
      const Number = conn.decodeNum(text)
      const num = m.isLid ? Number + '@lid' : Number + '@s.whatsapp.net'
      if (!db.users[num]) throw 'Nomor tidak ada dalam database coba untuk unban dari grup'
      db.users[num].banned = false
      db.users[num].bannedReason = ''
      m.reply(`Nomor ${num.split('@')[0]} berhasil dihapus dari database banned\nSekarang Nomor Itu Bisa Menggunakan Bot Ini\nUntuk melihat daftar banned ketik .listbanned`);
   },
   admin: true
}