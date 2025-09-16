module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      const links = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
      const shorts = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;
      const exc = budy.includes('.ytv') || budy.includes('.ytmp4') || budy.includes('.yta') || budy.includes('.ytmp3') || budy.includes('.play') || budy.includes('ytv') || budy.includes('ytmp4') || budy.includes('yta') || budy.includes('ytmp3') || budy.includes('play') || budy.includes('ytmp4doc') || budy.includes('ytvdoc') || budy.startsWith('>') || budy.startsWith('=>');
      if (db.settings?.auto_down && links.test(budy) || shorts.test(budy)) {
         if (m.isBaileys || exc) return false
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         const link = budy.match(links) || budy.match(shorts);
         m.react('🕙');
         const data = await Scraper.ocean(link, 'mp4', 720).catch(async () => await Scraper.ocean(link, 'mp4', 480)).catch(async () => await Scraper.ocean(link, 'mp4', 360));
         const caption = `🍌 Youtube Video\n${java} Judul : ${data.title}`
         conn.sendFile(m.chat, data.media, caption, m);
         db.users[m.sender].limit -= 3;
         m.reply(limit_message.replace('%limit', 3));
      }
   }
}