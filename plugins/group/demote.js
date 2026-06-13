exports.default = {
   names: ['Group Menu'],
   tags: ['demote'],
   command: ['demote', 'dmt'],
   start: async (m, {
      conn, 
      text
   }) => {
      if (m?.quoted) {
         await conn.groupParticipantsUpdate(m.chat, [m.quoted.sender], "demote");
         return m.reply(`Sekarang @${m.quoted.sender.split("@")[0]} Tidak Lagi Jadi Admin`, { mentions: [m.quoted.sender] });
      } else if (text) {
         const user = conn.parseMention(text);
         await conn.groupParticipantsUpdate(m.chat, [...user], "demote");
         return m.reply(`Sekarang @${user[0].split("@")[0]} Tidak Lagi Jadi Admin`, { mentions: [...user] });
      } else {
         return m.reply(`Tag atau Balas Orangnya Yang Mau Di Demote Atau Di Berhentikan Jadi Admin`);
      }
   },
   group: true,
   admin: true
};