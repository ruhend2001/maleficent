exports.default = {
   names: ['Owner'],
   tags: ['on welcome'],
   command: ['on'],
   start: (m, {
      conn,
      text,
      prefix,
      User,
      command,      
      groupName
   }) => {
      if (!text) return m.reply(`Masukan Parameternya contoh ${prefix+command} welcome`)
      const change = {
         welcome: true
      }
      User.switchGroup(m.chat, change);
      m.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
   },
   admin: true,
   group: true
};