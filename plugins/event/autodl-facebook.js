const { fbdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (db.settings?.auto_down && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {         
         if (m.isBaileys || budy.includes('.fb') || budy.match(/\.facebook\s/) || budy.match('fb' + ' ') || budy.match('facebook' + ' ')) return;
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🕒');
         const data = (await fbdl(budy)).data;
         for (let video of data) conn.sendFile(m.chat, video.url, `🍌 Facebook`, m);
         db.users[m.sender].limit -= 3
         m.reply(limit_message.replace('%limit', 3))
      }
   }
}