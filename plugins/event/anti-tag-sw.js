module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner
   }) => {
      try {
         if (!isAdmins && !isOwner && Object?.keys(statusMentions)?.length > 1) {
            conn.reply(statusMentions.key.remoteJid, `Terdeteksi Pansos Caper Tag Status Ke Group`, statusMentions)
            conn.sendMessage(m.chat, {
              delete: statusMentions.key
           }), statusMentions = {}
        }
      } catch {
         return false
      }     
   }
}