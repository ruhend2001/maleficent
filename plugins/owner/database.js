const fs = require('fs');
exports.default = {
   names: ['Owner'],
   tags: ['database'],
   command: ['db', 'database', 'getdb'],
   start: async (m, {
      conn 
   }) => {
      m.reply(`Tunggu sedang mengambil file database...`).then(() => {
         conn.sendFile(m.chat, fs.readFileSync('./database.json'), '', m, {
            document: true,
            fileName: 'database.json',
            mimetype: 'application/json'
         })
      })
   },
   owner: true
}