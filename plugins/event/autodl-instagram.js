const { igdl } = require('ruhend-scraper');
const { exec } = require('child_process');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (db.settings?.auto_down && !m.isBaileys && budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g)) {
         if (await validatePrefixCmd(budy, 'ig|instagram|insta|igdl')) return
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🕘')
         const data = await igdl(budy);
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
         db.users[m.sender].limit -= 3
         m.reply(limit_message.replace('%limit', 3));
      }
   }
}