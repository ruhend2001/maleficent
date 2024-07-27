exports.default = {
   names: ['Owner'],
   tags: ['on welcome'],
   command: ['on'],
   start: (m, {
      conn,
      text,
      prefix,
      command,      
      groupName
   }) => {
      if (!text) return m.reply(`Masukan Parameternya contoh ${prefix+command} welcome`)
      db.chats[m.chat].welcome = true
      m.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
   },
   admin: true,
   group: true
};