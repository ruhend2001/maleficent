exports.default = {
   names: ['Owner'],
   tags: ['backupsc', 'backupscript'],
   command: ['backupsc', 'backupscript'],
   start: async (m, {
      conn,
      Format
   }) => {     
      m.reply(`Tunggu sedang backup script...`);
      const data = await Format.backup_script();
      conn.sendFile(m.chat, data, '', m, {
         document: true,
         fileName: 'script_backup.zip',
         mimetype: 'application/zip'
      })
   },
   owner: true,
   private: true
}