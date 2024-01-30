export default {
   names: ['Group Menu'],
   tags: ['antilink'],
   command: ['antilink'],
   start: async (m, {
      conn,
      text,
      prefix,
      User,
      command,
      groupName
   }) => {
      if (!text) return m.reply(`Masukkan Parameternya contoh ${prefix+command} on/off`);
      let change;
      if (text.toLowerCase() === "on") {
         change = {
            antilink: true
         };
         m.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
      } else if (text.toLowerCase() === "off") {
         change = {
            antilink: false
         };
         m.reply(`Antilink berhasil dimatikan di grup ${groupName}`);
      } else {
         return m.reply(`Masukkan Parameter yang Valid (on/off)`);
      }
      User.switchGroup(m.chat, change);
   },
   group: true,
   admin: true,
   owner: true
};