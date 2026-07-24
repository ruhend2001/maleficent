const { ttdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      const link = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
      if (db.settings?.auto_down && link.test(budy) && !m.isBaileys) {
         if (await validatePrefixCmd(budy, 'tt|tiktok|ttdl')) return       
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         const tiktokLinks = budy.match(link);
         for (let tiktokLink of tiktokLinks) {
            m.react('🕒');
            const { title, author, like, comment, share, video } = await ttdl(tiktokLink);
            let caption = `🎗 𝐓𝐈𝐊𝐓𝐎𝐊\n`
            caption += `⭔ Name: ${author}\n`
            caption += `⭔ Like: ${like}\n`
            caption += `⭔ Comment: ${comment}\n`
            caption += `⭔ Description : ${title}\n`
            caption += `${star} ${setting.botName}`
            await conn.sendFile(m.chat, video, caption, m);
            db.users[m.sender].limit -= 3;
            m.reply(limit_message.replace('%limit', 3));
         }
      }
   }
}