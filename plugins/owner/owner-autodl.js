exports.default = {
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
      if (text.toLowerCase() === "on") {
         setting.auto_dl = true
         save_setting()
         m.reply(`auto download berhasil diaktifkan`);
      } else if (text.toLowerCase() === "off") {
         setting.auto_dl = false
         save_setting()
         m.reply(`auto download berhasil dimatikan `);
      } else {
         return m.reply(`Masukkan Parameter yang valid on/off`);
      }
   },
   owner: true
};