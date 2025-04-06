module.exports = async (update, conn, opts, image) => {
   const { Welcome, Bye, Number, Desc } = opts
   const musicBye = 'https://qu.ax/ngcCJ.mp3'
   const musicWelcome = ['https://qu.ax/BsVsg.mp3', 'https://qu.ax/NWsHo.mp3']   
   const picture = await conn.profilePictureUrl(Number).catch(async () => await conn.profilePictureUrl(update.id));
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
               thumbnail: await BUFFER_URL(picture),
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
                  thumbnail: await BUFFER_URL(picture),
                  sourceUrl: global.link_group
               }
            }
         })
      }
   }
}