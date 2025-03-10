const { ytmp4 } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4', 'ytmp4doc'],
   command: ['ytmp4', 'ytv', 'ytmp4doc', 'ytvdoc'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      const { title, video, author, description, duration, views, quality, upload, thumbnail } = await ytmp4(text);            
      let caption = `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")} \n`
      caption += `⭔ *Title:* ${title}\n`
      caption += `⭔ *Author:* ${author}\n`
      caption += `⭔ *Description:* ${description}\n`
      caption += `⭔ *Duration:* ${duration}\n`
      caption += `⭔ *Views:* ${views}\n`
      caption += `⭔ *Upload:* ${upload}\n\n`
      caption += `*Loading video sedang di kirim*`
      conn.adReply(m.chat, caption, thumbnail, m, {
         showAds: true
      }).then(() => {
         conn.sendFile(m.chat, video, '', m, {
            document: true,
            fileName: `${title}-${quality}~Ruhend-MD.mp4`,
            mimetype: 'video/mp4'
         })
      })
   },
   limit: 3,
   premium: false
}