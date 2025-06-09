module.exports = {
   start: async (m, {
      conn,
      isAdmins,
      isOwner,
      isBotAdmins,
      Format
   }) => {
      try {
         if (!isAdmins && !isOwner && Object?.keys(statusMentions)?.length > 1 && db.chats[statusMentions?.key?.remoteJid]?.tagsw) {
            conn.reply(statusMentions.key.remoteJid, `*Terdeteksi Pansos Caper Tag Status Ke Group Atau Ngemis Penonton*\n*Silahkan Klik Laporkan dan Blokir Orang Ini*\n*@${statusMentions.key.participant.split("@")[0]}*\n*Agar Status Gak Guna atau Sampahnya Dia Tidak Muncul Di Menu Status Pembaruan Kalian*`, statusMentions, { contextInfo: { mentionedJid: [statusMentions.key.participant] }});           
            if (isBotAdmins) {
               conn.sendMessage(m.chat, {
                  delete: statusMentions.key
               }).then(() => {
                  conn.groupParticipantsUpdate(statusMentions.key.remoteJid, [statusMentions.key.participant], 'remove');
               })
            }
            conn.updateBlockStatus(statusMentions.key.participant, 'block');
            await Format.sleep(1000).then(() => statusMentions = {})           
        }
      } catch (e) {
         return console.error(e)
      }     
   }
}