module.exports = {
   start: async (m, {
      conn,
      mime,
      isAdmins,
      isOwner
   }) => {
      if (!m.fromMe && !isAdmins && !isOwner && db.chats[m.chat]?.antiPhoto && (m.mtype === 'imageMessage' || /image/.test(mime))) {
         return await m.reply('Maaf Kak Anti Photo Aktif'), await m.delete(m.key)
      }
   }
}