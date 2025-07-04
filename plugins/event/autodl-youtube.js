const ocean = require('../../lib/src/scraper/ocean.js');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      const Links = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
      const ShortsLinks = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;
      const ExLyt = budy.includes('.ytv') || budy.includes('.ytmp4') || budy.includes('.yta') || budy.includes('.ytmp3') || budy.includes('.play') || budy.includes('ytv') || budy.includes('ytmp4') || budy.includes('yta') || budy.includes('ytmp3') || budy.includes('play') || budy.includes('ytmp4doc') || budy.includes('ytvdoc');
      if (db.settings?.auto_down && Links.test(budy) || ShortsLinks.test(budy)) {
         if (m.isBaileys || ExLyt) return false
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         const youtubeLinks = budy.match(Links) || budy.match(ShortsLinks);
         m.react('🕙')
         const data = await ocean(youtubeLinks, 'mp4', 720);
         const caption = `🍌 Youtube Video\n${java} Judul : ${data.title}`
         conn.sendFile(m.chat, data.link, caption, m);
         db.users[m.sender].limit -= 3;
         m.reply(limit_message.replace('%limit', 3));
      }
   }
}