module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      if (!m.fromMe && !isAdmins && !isOwner && db.chats[m.chat]?.antiBot && m.isBaileys) {
         return await m.reply('Maaf Kak Admin Mengaktifkan Anti Bot Lain Dan Kau Akan Segera Di Usir'), await m.delete(m.key), await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      }
   }
}