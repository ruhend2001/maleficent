const fetch = require('node-fetch');
module.exports = async (update, conn, opts, image) => {
   const { Welcome, Bye, Number, Desc } = opts
   const musicBye = "https://qu.ax/AHUTz.mp3"
   const musicWelcome = ["https://qu.ax/ZvGNw.mp3", "https://qu.ax/xUKpr.mp3"]   
   const picture = await conn.profilePictureUrl(Number).catch(_ => 'https://qu.ax/xAPoC.jpeg');
   if (update.action == 'remove') {
      conn.adReply(update.id, Bye, picture, null, {
         mentions: [Number],
         manyForward: true
      });
      conn.sendFile(update.id, musicBye, {
         ptt: true,
         contextInfo: {
            mentionedJid: [Number],
            externalAdReply: {
               title: `Bye 👋 ${Number.split('@')[0]}`,
               mediaType: 1,
               showAdAttribution: false,
               thumbnailUrl: picture,
               thumbnail: await (await fetch(picture)).buffer(),
               sourceUrl: global.link_group
            }
         }
      })
   } else if (update.action == 'add') {
      conn.adReply(update.id, `${Welcome}`, picture, null, {
         mentions: [Number],
         manyForward: true
      });
      for (let music of musicWelcome) {
         await conn.sendFile(update.id, music, {
            ptt: true,
            contextInfo: {
               mentionedJid: [Number],
               externalAdReply: {
                  title: `Welcome 👋 ${Number.split('@')[0]}`,
                  mediaType: 1,
                  showAdAttribution: false,
                  thumbnailUrl: picture,
                  thumbnail: await (await fetch(picture)).buffer(),
                  sourceUrl: global.link_group
               }
            }
         })
      }
   }
}