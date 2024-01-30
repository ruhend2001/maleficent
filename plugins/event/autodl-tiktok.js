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
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         }
         let tiktokLinks = budy.match(tR)
         for (let tiktokLink of tiktokLinks) {
            let { name, title, video } = await ttdl(tiktokLink)
            m.react('🕒', m.chat)
            let Tiktok = `🎗 *TIKTOK* \n`
            Tiktok += `⭔ Name : ${name}\n`
            Tiktok += `⭔ Caption : ${title}`
            conn.sendFile(m.chat, video, {
               caption: Tiktok,
               quoted: m
            })
            User.Limit(m, m.sender, 3);
         }
      }
   }
};