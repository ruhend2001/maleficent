module.exports = {
   start: async (m, {
      conn,
      isOwner,
      isAdmins,
      isBotAdmins,
      Format
   }) => {
      if (m.mtype === 'groupStatusMentionMessage' && !m.isBaileys) {
         if (isOwner) return console.log('Owner sending status mentions');
         if (isAdmins) return console.log('Admin sending status mentions');
         await m.reply(`*Terdeteksi Pansos Caper Tag Status Ke Group Atau Ngemis Penonton*\n*Silahkan Klik Laporkan dan Blokir Orang Ini*\n*@${m.sender.split("@")[0]}*\n*Agar Status Gak Guna atau Status Sampah Dia Itu Tidak Muncul Di Menu Status Pembaruan Kalian!*`, { contextInfo: { mentionedJid: [m.sender] }});
         if (isBotAdmins) await m.delete(m.key), await Format.sleep(3000), await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
         return conn.updateBlockStatus(m.sender, 'block'), console.log(m.sender.split('@')[0], 'Blocked Cause Sending Status Mention In Group!');
      }
   }
}