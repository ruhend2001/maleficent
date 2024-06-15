export default {
   names: ['Owner'],
   tags: ['database'],
   command: ['db', 'database', 'getdb'],
   start: async (m, {
      conn,
      User
   }) => {
      let { data, name, mime } = await User.getDB();
      m.reply(`Tunggu sedang mengambil file database...`);    
      conn.sendMessage(m.chat, { document: data, caption: 'Berhasil Backup database', mimetype: mime, fileName: name }, { quoted: m });
   },
   owner: true
}
