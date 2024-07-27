exports.default = {
   names: ['Owner'],
   tags: ['off welcome'],
   command: ['off'],
   owner: true,
   start: (m, {
      conn,
      text,
      prefix,
      command,
      groupName
   }) => {
      if (!text) return m.reply(`Masukan Parameternya contoh ${prefix+command} welcome`)
      db.chats[m.chat].welcome = false
      m.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
   },
   admin: true,
   group: true
};