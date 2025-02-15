const { igdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['instagram'],
   command: ['instagram', 'ig', 'igdl', 'instegrem', 'insta'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      try {
         if (!text) return m.reply(`Masukan instagram \ncontoh: ${prefix+command} https://www.instagram.com/p/DFREQm3BT1F/?img_index=4&igsh=cnJwMWI3bTh0dnU0`);
         const res = await igdl(text);
         conn.adReply(m.chat, loading, cover, m);
         const data = await res.data;
         for (let i = 0; i < 20; i++) {
            const media = data[i];
            await Format.sleep(2000);
            conn.sendFile(m.chat, media.url, {
               quoted: m
            });
         }
      } catch { 
         return false
      }
   },
   limit: true,
   premium: false
}