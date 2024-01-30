export default {
   names: ['Owner'],
   tags: ['database'],
   command: ['db', 'database', 'getdb'],
   start: async (m, {
      conn,
      sleep,
      User,
      Format
   }) => {
      let { data, name, mime } = await User.getDB()
      m.reply(`Tunggu sedang mengambil file database...`)
      await Format.sleep(3500) //this depending on your user if too many users i think 5000 is okay
      conn.sendMessage(m.chat, {
         document: {
            url: data
         },
         caption: 'Berhasil Backup database',
         mimetype: mime,
         fileName: name
      }, {
         quoted: m
      })
   },
   owner: true
};