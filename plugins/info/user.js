exports.default = {
   names: ['Info'],
   tags: ['user', 'totaluser', 'pengguna'],
   command: ['user', 'totaluser', 'pengguna'],
   start: async (m, {
      conn
   }) => {
      const user = Object.keys(db.users).length;
      const user_reg = Object.entries(db.users).filter(user => user[1].registered);
      // const registeredList = registeredUsers.map(user => `${user.jid.split('@')[0]}`).join('\n');
      // let text = `Berikut Adalah List Pengguna Terdaftar ${setting.botName}\n`;
      // text += `Total : ${registeredUsers.length}\n`;
      // text += `User: ${registeredList ? '\n' + registeredList : ''}`;
      const registered = user_reg.map(([jid, user]) => jid);
      const caption = `Total user: ${user} pengguna\nTotal terdaftar: ${registered.length} pengguna`;
      conn.adReply(m.chat, caption, cover, m);
   }
}