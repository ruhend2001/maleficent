module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      const linksRegex = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
      const shortsRegex = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;      
      const linkMatch = budy.match(linksRegex) || budy.match(shortsRegex);      
      if (db.settings?.auto_down && !m.isBaileys && linkMatch) {
         const prefixes = global.isPrefix.map(p => p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('');
         if (await validatePrefixCmd(budy, 'yt|ytv|yta|ytmp3|ytmp4|play|ytmp4doc|ytvdoc')) return         
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('⏰');
         const data = await Scraper.y2mate(linkMatch[0], 'mp4');
         const caption = `🎬 *YouTube* \n${data.title}`;
         await conn.sendFile(m.chat, await toBuffer(data.url), caption, m);
         db.users[m.sender].limit -= 3;
         m.reply(limit_message.replace('%limit', 3));
      }
   }
}