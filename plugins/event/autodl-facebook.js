const { fbdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      const fbLink = budy.match(/(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s]+/)?.[0];
      if (db.settings?.auto_down && fbLink && !m.isBaileys) {      
         if (await validatePrefixCmd(budy, 'fb|facebook|fbdl')) return
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🕒');
         const data = await fbdl(fbLink);
         for await (let media of data) await conn.sendFile(m.chat, media, '*Facebook*', m), await sleep(2000)
         db.users[m.sender].limit -= 3
         m.reply(limit_message.replace('%limit', 3))
      }
   }
}
