const { igdl } = require('ruhend-scraper');
const { exec } = require('child_process');
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
         m.react("🕒"), conn.adReply(m.chat, loading, cover, m);
         const data = await igdl(text);
         for await (let v of data) {
            const video = await conn.getMime(v)
            if (/video/.test(video)) {
               await conn.sendFile(m.chat, v, '', m)
            } else {
               const media = (await conn.getFile(v)).res;
               const outPath = media.replace(/\.\w+$/, '.jpg');
               await new Promise((resolve, reject) => {
                  exec(`ffmpeg -i ${media} ${outPath}`, (err) => {
                     if (err) reject(err);
                     else resolve();
                  })
               })
               await m.reply(await toBuffer(outPath));
            }
         }
      } catch {
         return null
      }
   },
   limit: 2,
   premium: false
}