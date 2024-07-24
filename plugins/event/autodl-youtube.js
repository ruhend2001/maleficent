const { ytmp4 } = require('ruhend-scraper');
module.exports = {
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
         if (User.checkLimitUser(m.sender) <= 0) return m.reply(mess.limit);
         let youtubeLinks = budy.match(Links) || budy.match(ShortsLinks);
         for (let youtubeLink of youtubeLinks) {
            m.react('🕙')
            let { title, video, quality, thumbnail, size } = await ytmp4(youtubeLink);
            m.react('🐽')
            let caption = `🍌 Youtube Video\n`
            caption += `${java} Judul : ${title}\n`
            caption += `${java} Kualitas : ${quality}\n`
            caption += `${java} Size : ${size}`
            conn.sendFile(m.chat, video, {
               caption: caption,
               quoted: m
            });
            User.Limit(conn, 4, m);
         }
      }
   }
};