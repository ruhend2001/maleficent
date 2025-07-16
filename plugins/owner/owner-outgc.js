exports.default = {
   names: ['Owner'],
   tags: ['out', 'keluar', 'outgc', 'outlistgc', 'outall', 'outgcall'],
   command: ['out', 'keluar', 'outgc', 'outlistgc', 'outall', 'outgcall'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (command === 'outgc' || command === 'outlistgc') {
         if (m.isGroup) return m.reply('Gunakan Di Private Chat Saja Agar Lebih Flexibel');
         return await Format.leave_group(m, { conn, prefix, command, text, Format }); 
      } else if (command === 'out' || command === 'outkeluar') {
         return m.reply('Bye').then(async () => delete db.chats[m.chat], await conn.groupLeave(m.chat));
      } else if (command === 'outall' || command === 'outgcall') {
         if (m.isGroup) return m.reply('Gunakan Di Private Chat Saja Agar Lebih Flexibel');
         await m.reply('OK Bot Akan Keluar Dari Semua Group')
         return await Format.leave_group_all(m, { conn });
      }
   },
   owner: true
}