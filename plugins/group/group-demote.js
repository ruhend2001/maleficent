export default {
   names: ['Group Menu'],
   tags: ['demote'],
   command: ['demote'],
   start: async (m, {
      conn,
      mentionUser
   }) => {
      if (mentionUser.length !== 0) {
         conn.groupParticipantsUpdate(m.chat, [mentionUser[0]], "demote");
         m.reply(`Sekarang ${mentionUser} Tidak Lagi Jadi Admin`)
      } else {
         m.reply(`Tag Admin Yang Mau Di demote`)
      }
   },
   group: true,
   admin: true
};