exports.default = {
   names: ['Group Menu'],
   tags: ['kick', 'tendang'],
   command: ['kick', 'tendang', '-', 'dor', 'door'],
   start: async (m, {
      conn, 
      text
   }) => {
      if (m?.quoted) {
         await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], "remove");
         return m.reply(`Berhasil Menghapus @${m.quoted.sender.split("@")[0]} Dari Grup Ini`, { mentions: [m.quoted.sender] });
      } else if (text) {
         const user = conn.parseMention(text);
         await conn.groupParticipantsUpdate(m.chat, [...user], "remove");
         return m.reply(`Berhasil Menghapus @${user[0].split("@")[0]} Dari Grup Ini`, { mentions: [...user] });
      } else {
         return m.reply(`Tag atau Balas Orangnya Yang Mau Di Keluarkan`);
      }
   },
   group: true,
   admin: true
};