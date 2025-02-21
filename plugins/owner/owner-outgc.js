exports.default = {
   names: ['Owner'],
   tags: ['out', 'keluar', 'outgc', 'outlistgc'],
   command: ['out', 'keluar', 'outgc', 'outlistgc'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (/outgc|outlistgc/.test(command)) {
         return await Format.leave_group(m, { conn, prefix, command, text, Format }); 
      } else if (/out|keluar/.test(command)) {
         return m.reply('Bye').then(async () => await conn.groupLeave(m.chat));
      }
   },
   owner: true
}