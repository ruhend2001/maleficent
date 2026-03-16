exports.default = {
   names: ['Info'],
   tags: ['script'],
   command: ['script', 'sc', 'repo', 'repositori'],
   start: (m, {
      conn
   }) => {
      const script = 'Menggunakan Base Script Ini \n\nhttps://github.com/ruhend2001/kumpulan-lagu/archive/refs/heads/main.zip'
      conn.adReply(m.chat, script, cover, m)
   }
};