const ocean = require('../../lib/src/scraper/ocean.js');
exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4'],
   command: ['ytmp4', 'ytv'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('📥')
      let caption = '', video = await ocean(text, 'mp4');         
      caption += `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")} \n`
      caption += `⭔ *Title:* ${video.title}\n`     
      caption += `*Loading video sedang di kirim*`
      conn.adReply(m.chat, caption, video.thumbnail || cover, m, {
         showAds: true
      }).then(() => {
         conn.sendFile(m.chat, video.link, '', m, {
            document: true,
            fileName: `${video.title}-720p~Ruhend-MD.mp4`,
            mimetype: 'video/mp4'
         })
      })
   },
   limit: 3,
   premium: false
}