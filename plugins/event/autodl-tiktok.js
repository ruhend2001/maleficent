import { ttdl }  from '../../lib/download.js'
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      let tR = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
      if (autodl && tR.test(budy)) {
         if (budy.includes('.tt') || (budy.match(/\.tiktok\s/))) return
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         }
         let tiktokLinks = budy.match(tR)
         for (let tiktokLink of tiktokLinks) {
            let { desc, name, like, comment, share, video } = await ttdl(tiktokLink);      
            m.react('🕒', m.chat);
            let caption = `🎗 𝐓𝐈𝐊𝐓𝐎𝐊\n`
            caption += `⭔ Name: ${name}\n`
            caption += `⭔ Description : ${desc}\n`
            caption += `⭔ Like: ${like}\n`
            caption += `⭔ Comment: ${comment}\n`
            caption += `⭔ Share: ${share}\n\n`
            caption += `${star} ${setting.botName}`
            conn.sendFile(m.chat, video, {
               caption: caption,
               quoted: m
            })
            User.Limit(m, m.sender, 3);
         }
      }
   }
}
