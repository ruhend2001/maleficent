exports.default = {
   names: ['Main Menu'],
   tags: ['copy'],
   command: ['copy'],
   start: async (m, {
      conn
   }) => {
      // this is example button copy
      conn.sendCopy(m.chat, 'Silahkan Copy ', 'Salin', 'tes salin', cover , m)   
   }
}