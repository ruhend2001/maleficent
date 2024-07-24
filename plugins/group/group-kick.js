exports.default = {
   names: ['Group Menu'],
   tags: ['kick', 'tendang'],
   command: ['kick', 'tendang', '-'],
   start: async (m, {
      conn,
      mentionUser,
      mentionByReply
   }) => {
      if (mentionUser.length !== 0) {
         await conn.groupParticipantsUpdate(m.chat, [mentionUser[0]], "remove");
         m.reply(`Berhasil Menghapus ${mentionUser} Dari Grup Ini`)
      } else if (mentionByReply) {
         await conn.groupParticipantsUpdate(m.chat, [mentionByReply], "remove");
         m.reply(`Berhasil Menghapus ${mentionByReply} Dari Grup Ini`)
      } else {
         return m.reply(`Tag Yang Mau Di Kick`)
      }
   },
   group: true,
   admin: true
};