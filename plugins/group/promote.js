exports.default = {
   names: ['Group Menu'],
   tags: ['jadiadmin', 'promote'],
   command: ['jadiadmin', 'promote'],
   start: async (m, {
      conn, 
      text
   }) => {
      if (m?.quoted) {
         await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], "promote");
         return m.reply(`Sekarang @${m.quoted.sender.split("@")[0]} Jadi Admin`, { mentions: [m.quoted.sender] });
      } else if (text) {
         const user = conn.parseMention(text);
         await conn.groupParticipantsUpdate(m.chat, [...user], "promote");
         return m.reply(`Sekarang @${user[0].split("@")[0]} Jadi Admin`, { mentions: [...user] });
      } else {
         return m.reply(`Tag atau Balas Orangnya Yang Mau Di Promote`)
      }
   },
   group: true,
   admin: true
};