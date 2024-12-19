const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { lookup } = require('mime-types');
const { URL_REGEX } = require('@adiwajshing/baileys');
module.exports = {
   start: async (m, {
      conn,
      budy,      
   }) => {
      const event = db.users[m.sender].event
      if (event.pinterest) {
         if (budy.match(/^\s*1\s*$/)) {
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            m.react('🔁')
            const text = event.pinterest.text
            const res = await Pinterest(text);
            const mime = await lookup(res);            
            let pinterest = `${javi} 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓\n`
            pinterest += `Result From ${text}\n\n`
            pinterest += `> 1. Lanjut\n> 2. Stop`     
            m.reply(limit_message.replace('%limit', 2)).then(() => {               
               conn.sendFile(m.chat, res, pinterest.trim(), m);
               db.users[m.sender].limit -= 2
            });
         } else if (budy.match(/^\s*2\s*$/)) {
            m.reply('OK 👍').then(() => delete event.pinterest);
         }
      }
   }
};
async function shortUrl(url) {
   return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
};
async function Pinterest(query) {
   if (query.match(URL_REGEX)) {
      let res = await fetch('https://www.expertsphp.com/facebook-video-downloader.php', {
         method: 'post',
         body: new URLSearchParams(Object.entries({
            url: query
         }))
      })
      let $ = await cheerio.load(await res.text())
      let data = $('table[class="table table-condensed table-striped table-bordered"]').find('a').attr('href')
      if (!data) throw 'Can\'t download post :/'
      return data
   } else {
      let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
      let json = await res.json()
      let data = json.resource_response.data.results
      if (!data.length) throw `Query "${query}" not found :/`
      return data[~~(Math.random() * (data.length))].images.orig.url
   }
};