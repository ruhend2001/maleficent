exports.default = {
   names: ['Group Menu'],
   tags: ['antilink'],
   command: ['antilink'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      groupName
   }) => {
      if (!text) return m.reply(`Masukkan Parameternya contoh ${prefix+command} on/off`);
      let change;
      if (text.toLowerCase() === "on") {
         db.chats[m.chat].antilink = true
         m.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
      } else if (text.toLowerCase() === "off") {
         db.chats[m.chat].antilink = false
         m.reply(`Antilink berhasil dimatikan di grup ${groupName}`);
      } else {
         return m.reply(`Masukkan Parameter yang Valid (on/off)`);
      }
   },
   group: true,
   admin: true   
};