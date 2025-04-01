module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      if (m.mentionedJid) {             
         const hide = m.mentionedJid.length > 10
         if (hide) {
            if (isAdmins && isOwner && conn.decodeJid(conn.user.id)) return false
            return m.reply(`Hidetag or Tagall Detected`).then(async () => {      
               return await conn.sendMessage(m.chat, {
                  delete: {
                     remoteJid: m.chat,
                     fromMe: false,
                     id: m.key.id,
                     participant: m.sender
                  }
               })
            })
         }
      }
   }
}