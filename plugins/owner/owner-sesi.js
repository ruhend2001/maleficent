const fs = require('fs');
const { exec } = require('child_process');
exports.default = {
   names: ['Owner'],
   tags: ['sesi', 'getsesi'],
   command: ['sesi', 'getsesi'],
   start: async (m, {
      conn 
   }) => {     
      m.reply(`Tunggu sedang mengambil file sesi...`).then(() => {
         exec('zip -r tmp/sessions.zip sessions/creds.json sessions/app*', () => {
            conn.sendFile(m.chat, fs.readFileSync('./tmp/sessions.zip'), '', m, {
               document: true,
               fileName: 'sessions.zip',
               mimetype: 'application/zip'
            })
         })     
      })
   },
   owner: true,
   private: true
}