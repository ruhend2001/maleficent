export default {
   names: ['Owner'],
   tags: ['off welcome'],
   command: ['off'],
   owner: true,
   start: async (m, {
      conn,
      text,
      prefix,
      User,
      command,
      groupName
   }) => {
      if (!text) return m.reply(`Masukan Parameternya contoh ${prefix+command} welcome`)
      const change = {
         welcome: false
      }
      User.switchGroup(m.chat, change);
      m.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
   },
   admin: true,
   owner: true,
   group: true
};