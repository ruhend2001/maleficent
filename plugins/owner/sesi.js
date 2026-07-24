exports.default = {
   names: ['Owner'],
   tags: ['sesi', 'getsesi'],
   command: ['sesi', 'sessi', 'getsesi'],
   start: async (m, {
      conn,
      Format
   }) => {     
      m.reply(`Tunggu sedang mengambil file sessi...`);
      const data = await Format.sessions();
      conn.sendFile(m.chat, data, '', m, {
         document: true,
         fileName: 'sessions.zip',
         mimetype: 'application/zip'
      })
   },
   owner: true,
   private: true
};