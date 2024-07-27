const { ttdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      let tR = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
      if (autodl && tR.test(budy)) {
         if (budy.includes('.tt') || (budy.match(/\.tiktok\s/))) return
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         let tiktokLinks = budy.match(tR);
         for (let tiktokLink of tiktokLinks) {
            let { desc, name, like, comment, share, video } = await ttdl(tiktokLink);           
            m.react('🕒');
            let caption = `🎗 𝐓𝐈𝐊𝐓𝐎𝐊\n`
            caption += `⭔ Name: ${name}\n`
            caption += `⭔ Description : ${desc}\n`
            caption += `⭔ Like: ${like}\n`
            caption += `⭔ Comment: ${comment}\n`
            caption += `⭔ Share: ${share}\n`
            caption += `${star} ${setting.botName}`
            conn.sendFile(m.chat, video, {
               caption: caption,
               quoted: m
            });
            db.users[m.sender].limit -= 3
            m.reply(limit_message.replace('%limit', 3))
         }
      }
   }
}