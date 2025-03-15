const cheerio = require('cheerio');
const fetch = require('node-fetch');
module.exports = {
   start: async (m, {
      conn,
      budy,
   }) => {
      const event = db.users[m.sender].event_cmd
      if (event.pinterest && event.pinterest.status) {
         if (word(budy, '1')) {
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            const text = event.pinterest.search;
            const images = await Format.Scraper.pinterest(text);      
            if (images.length == 0) return m.reply('Not Found / Error');
            let pinterest = `${javi} 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓\n`
            pinterest += `Result From ${text}\n\n`
            pinterest += `1. Lanjut\n2. Stop`
            m.reply(limit_message.replace('%limit', 1)).then(() => {
               db.users[m.sender].limit -= 1
               conn.sendFile(m.chat, pickRandom(images), pinterest.trim(), m);
            })
         } else if (word(budy, '2')) {
            return m.reply('OK 👍').then(() => delete event.pinterest);
         }
      } else if (event.gimage && event.gimage.status) {
         if (word(budy, '1')) {
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            const text = event.gimage.search;
            const res = await googleImage(text);
            const Index = Math.floor(Math.random() * res.length);
            const image = res[Index];
            let gimage = `${javi} 𝐆𝐎𝐎𝐆𝐋𝐄 𝐈𝐌𝐀𝐆𝐄\n`
            gimage += `🔎 *Pencarian:* ${text}\n`
            gimage += `🌎 *Source:* Google\n\n`
            gimage += `1. Lanjut\n2. Stop`
            m.reply(limit_message.replace('%limit', 1)).then(() => {
               db.users[m.sender].limit -= 1
               conn.sendFile(m.chat, image, gimage.trim(), m);
            })
         } else if (word(budy, '2')) {
            return m.reply('OK 👍').then(() => delete event.gimage);
         }
      }
   }
};
async function googleImage(query) {
   const data = await (await fetch(`https://www.google.com/search?q=${query}&tbm=isch`, {
      headers: {
         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
         'accept-encoding': 'gzip, deflate, br',
         'accept-language': 'en-US,en;q=0.9,id;q=0.8',
         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
      }
   })).text();
   const $ = cheerio.load(data);
   const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
   const matches = $.html().matchAll(pattern);
   const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
   return [...matches]
      .map(({
         groups
      }) => decodeUrl(groups === null || groups === void 0 ? void 0 : groups.url))
      .filter((v) => /.*\.jpe?g|png$/gi.test(v));
}