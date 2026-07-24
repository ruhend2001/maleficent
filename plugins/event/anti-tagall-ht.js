module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      if (m.mentionedJid) {             
         const hide = m.mentionedJid.length > 10
         if (hide) {
            if (isAdmins || isOwner) return false
            return await m.delete(m.key) //, m.reply(`Hidetag atau Tagall Terdeteksi`)
         }
      }
   }
}