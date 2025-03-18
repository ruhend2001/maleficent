exports.default = {
   names: ['Owner'],
   tags: ['hapusprem'],
   command: ['removeprem', 'hapusprem', 'delprem'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Tag / Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx`);
      const num = text.replace(/[@+\s-]/g, '') + '@s.whatsapp.net'; 
      db.users[num].premium = false
      db.users[num].premiumTime = ''
      m.reply(`Nomor ${num.split('@')[0]} tidak lagi menjadi premium`);
   },
   owner: true
}