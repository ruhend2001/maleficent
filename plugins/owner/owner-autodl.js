export default {
   names: ['Owner'],
   tags: ['autodownload'],
   command: ['autodownload', 'autodl'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan Parameternya contoh ${prefix+command} on/off`);
      let change;
      if (text.toLowerCase() === "on") {
         change = {
            auto_dl: true
         };
         m.reply(`auto download berhasil diaktifkan`);
      } else if (text.toLowerCase() === "off") {
         change = {
            auto_dl: false
         };
         m.reply(`auto download berhasil dimatikan `);
      } else {
         return m.reply(`Masukkan Parameter yang valid on/off`);
      }
      User.autoDownload(change);
   },
   owner: true
};