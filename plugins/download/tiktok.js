const { ttdl } = require('ruhend-scraper');
const { exec } = require('child_process');
exports.default = {
   names: ['Downloader'],
   tags: ['tiktok', 'titit'],
   command: ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command} ` + 'https://vt.tiktok.com/ZSYfBvx5d/')
      m.react('🕒')
      const { title, author, username, published, like, comment, share, views, bookmark, video, cover: picture, music } = await ttdl(text);     
      let caption = `${head("𝐓𝐈𝐊𝐓𝐎𝐊")} \n`
      caption += `⭔ *Author:* ${author}\n`
      caption += `⭔ *Username:* ${username}\n`
      caption += `⭔ *Published:* ${published}\n`
      caption += `⭔ *Like:* ${like}\n`
      caption += `⭔ *Comment:* ${comment}\n`
      caption += `⭔ *Views:* ${views}\n`
      caption += `⭔ *Bookmark:* ${bookmark}\n`
      caption += `⭔ *Description:* ${title}\n`
      caption += `${zw} ${namebot}\n ${wm}`      
      const vid = await conn.getMime(video);
      if (/video/.test(vid)) {
         return conn.sendFile(m.chat, video, caption, m);
      } else {
         const slides = (await toJSON(`https://api.siputzx.my.id/api/d/tiktok/v2?url=${text}`)).data.slides;
         const urls = Object.keys(slides).filter(key => !isNaN(key)).map(key => slides[key].url);       
         for await (let v of urls) {
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
         return m.reply(await toBuffer(video));
      }
   },
   limit: 2
}