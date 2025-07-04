const { igdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (db.settings?.auto_down && budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g)) {
         if (m.isBaileys || budy.includes('.ig') || budy.match(/\.instagram\s/) || budy.match('ig' + ' ') || budy.match('instagram' + ' ')) return
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🕘')
         const data = (await igdl(budy)).data;
         for await (let i of data) conn.sendFile(m.chat, i.url, { quoted: m })
         db.users[m.sender].limit -= 2
         m.reply(limit_message.replace('%limit', 2))        
      }
   }
}