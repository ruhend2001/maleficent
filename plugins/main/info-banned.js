exports.default = {
   names: ['Main Menu'],
   tags: ['listbanned', 'listban'],
   command: ['listbanned', 'listban'],
   start: async (m, {
      conn
   }) => {
      let users = Object.entries(db.users).filter(user => user[1].banned);
      let bannedUsers = users.map(([jid, user]) => {
         return {
            jid: jid,
            name: user.name,
            reason: user.bannedReason || 'Tidak ada alasan'
         };
      });
      let bannedList = bannedUsers.map(user => `Nomor: *${user.jid.split('@')[0]}*\nName: ${user.name || ''}\nAlasan Di Ban: ${user.reason}`).join('\n');
      let text = `Berikut Adalah List Pengguna Terbanned ${setting.botName}\n`;
      text += `Total : ${bannedUsers.length}\n`;
      text += `User: ${bannedList ? '\n' + bannedList : 'Tidak ada pengguna terbanned.'}`;
      conn.adReply(m.chat, text, cover, m);
   }
};