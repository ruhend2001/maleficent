const { igdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['instagram'],
   command: ['instagram', 'ig', 'igdl', 'instegrem', 'insta'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      try {
         if (!text) return m.reply(`Masukan instagram \ncontoh: ${prefix+command} https://www.instagram.com/p/DX3y0nUkwYR/?img_index=3&igsh=a3ZuZWp2MGtldW1p`);
         conn.adReply(m.chat, loading, cover, m);
         const data = await igdl(text);
         for (let media of data) conn.sendFile(m.chat, media, '', m), await sleep(2000)
      } catch { 
         return false
      }
   },
   limit: true,
   premium: false
}