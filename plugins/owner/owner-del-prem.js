exports.default = {
   names: ['Owner'],
   tags: ['hapusprem'],
   command: ['removeprem', 'hapusprem', 'delprem'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Tag / Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx`);
      const num = text.startsWith('@') ? conn.parseMention(text)[0] : conn.decodeNum(text) + '@s.whatsapp.net';
      if (!db.users[num]) throw 'Nomor tidak ada dalam database coba untuk delprem dari grup'
      db.users[num].premium = false
      db.users[num].premiumTime = ''
      m.reply(`Nomor ${num.split('@')[0]} tidak lagi menjadi premium`);
   },
   owner: true
}