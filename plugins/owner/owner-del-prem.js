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
      const Number = text.replace(/[@+\s-]/g, '');
      const num_1 = m.jid(Number+'@lid')      
      const num = num_1.endsWith('net') ? num_1 : Number + '@s.whatsapp.net'      
      db.users[num].premium = false
      db.users[num].premiumTime = ''
      m.reply(`Nomor ${num.split('@')[0]} tidak lagi menjadi premium`);
   },
   owner: true
}