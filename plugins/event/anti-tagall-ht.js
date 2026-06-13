module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      if (m.mentionedJid) {             
         const hide = m.mentionedJid.length > 10
         if (hide) {
            if (isAdmins || isOwner || m.id.startsWith('BAE5')) return false
            return m.reply(`Hidetag atau Tagall Terdeteksi`), m.delete(m.key)
         }
      }
   }
}