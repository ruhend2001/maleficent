const savetube = require('../../lib/src/scraper/savetube.js');
exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4', 'ytmp4_1080', 'ytv_1080'],
   command: ['ytmp4', 'ytv', 'ytmp4_1080', 'ytv_1080'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('📥')
      let video, caption = '';
      if (/(ytmp4_1080|ytv_1080)/.test(command)) video = await savetube.download(text, '1080');
      else if (/(ytmp4|ytv)/.test(command)) video = await savetube.download(text, '720');         
      caption += `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")} \n`
      caption += `⭔ *Title:* ${video.result.title}\n`     
      caption += `⭔ *Duration:* ${video.result.duration}\n\n`
      caption += `*Loading video sedang di kirim*`
      conn.adReply(m.chat, caption, video.result.thumbnail || cover, m, {
         showAds: true
      }).then(() => {
         conn.sendFile(m.chat, video.result.download, '', m, {
            document: true,
            fileName: `${video.result.title}-${video.result.quality || ''}p~Ruhend-MD.mp4`,
            mimetype: 'video/mp4'
         })
      })
   },
   limit: 3,
   premium: false
}