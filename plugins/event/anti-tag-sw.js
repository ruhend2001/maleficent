module.exports = {
   start: async (m, {
      conn,
      Format
   }) => {
      try {
         if (Object?.keys(statusMentions)?.length > 1 && db.chats[statusMentions?.key?.remoteJid]?.tagsw && !db.chats[statusMentions?.key?.remoteJid].mute) {
            const participants = (await conn.groupMetadata(statusMentions.key.remoteJid)).participants;
            const groupAdmins = participants?.filter(v => v.admin !== null).map(v => v.id);
            const isAdmins = groupAdmins?.includes(statusMentions.key.participant);
            const isBotAdmins = groupAdmins?.includes(conn.decodeJid(conn.user.id));
            const isOwner = [...setting.ownerNumber, conn.decodeJid(conn.user.id).split('@')[0]].map(num => `${num}@s.whatsapp.net`).includes(statusMentions.key.participant);
            if (isOwner) return console.log('Owner sending status mentions');
            if (isAdmins) return console.log('Admin sending status mentions');
            conn.reply(statusMentions.key.remoteJid, `*Terdeteksi Pansos Caper Tag Status Ke Group Atau Ngemis Penonton*\n*Silahkan Klik Laporkan dan Blokir Orang Ini*\n*@${statusMentions.key.participant.split("@")[0]}*\n*Agar Status Gak Guna atau Sampahnya Dia Tidak Muncul Di Menu Status Pembaruan Kalian*`, statusMentions, { contextInfo: { mentionedJid: [statusMentions.key.participant] }});           
            await Format.sleep(3000);
            if (isBotAdmins) {
               conn.sendMessage(m.chat, {
                  delete: statusMentions.key
               }), conn.groupParticipantsUpdate(statusMentions.key.remoteJid, [statusMentions.key.participant], 'remove');               
            };
            conn.updateBlockStatus(statusMentions.key.participant, 'block'), statusMentions = {}
        }
      } catch (e) {
         return console.error(e)
      }
   }
}