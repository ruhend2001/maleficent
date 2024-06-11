export default {
   names: ['Owner'],
   tags: ['database'],
   command: ['db', 'database', 'getdb'],
   start: async (m, {
      conn,
      User,
      Format
   }) => {
      let { data, name, mime } = await User.getDB()
      m.reply(`Tunggu sedang mengambil file database...`)
      await Format.sleep(3500);
      conn.sendMessage(m.chat, { document: { url: data }, caption: 'Berhasil Backup database', mimetype: mime, fileName: name }, { quoted: m });
   },
   owner: true
}
