module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      if (!m.fromMe && !isAdmins && !isOwner && db.chats[m.chat]?.antiBot && m.isBaileys) {
         return await m.reply('Maaf Kak Admin Mengaktifkan Anti Bot Lain Dan Kau Akan Segera Di Usir'), await conn.sendMessage(m.chat, {
            delete: {
               remoteJid: m.chat,
               fromMe: false,
               id: m.key.id,
               participant: m.sender
            }
         }), await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      }
   }
}