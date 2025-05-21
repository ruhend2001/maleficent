module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner,
      isBotAdmins,
      Format
   }) => {
      try {
         if (db.chats[m.chat].tagsw && !isAdmins && !isOwner && Object?.keys(statusMentions)?.length > 1) {
            conn.reply(statusMentions.key.remoteJid, `Terdeteksi Pansos Caper Tag Status Ke Group`, statusMentions)            
            if (isBotAdmins) {
               conn.sendMessage(m.chat, {
                  delete: statusMentions.key
               }).then(() => {
                  conn.groupParticipantsUpdate(statusMentions.key.remoteJid, [statusMentions.key.participant], 'remove');
               })
            }
            await Format.sleep(3000).then(() => statusMentions = {})           
        }
      } catch {
         return false
      }     
   }
}