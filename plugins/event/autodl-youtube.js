import { ytmp4 } from '../../lib/download.js'
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      let Links = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
      let ShortsLinks = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;
      let ExLyt = budy.includes('.ytv') || budy.includes('.ytmp4') || budy.includes('.yta') || budy.includes('.ytmp3') || budy.includes('.play')
      if (autodl && Links.test(budy) || ShortsLinks.test(budy)) {
         if (ExLyt) return
         if (m.isBaileys) return
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         }
         let youtubeLinks = budy.match(Links) || budy.match(ShortsLinks);
         for (let youtubeLink of youtubeLinks) {
            m.react('🕙', m.chat)
            let { title, video, quality, thumbnail, size } = await ytmp4(youtubeLink);
            m.react('🕒', m.chat)
            let Youtube = `🍌 Youtube Video\n`
            Youtube += `${java} Judul : ${title}\n`
            Youtube += `${java} Kualitas : ${quality}\n`
            Youtube += `${java} Size : ${size}`
            conn.sendFile(m.chat, video, {
               caption: Youtube,
               quoted: m
            });
            User.Limit(m, m.sender, 6);
         }
      }
   }
};