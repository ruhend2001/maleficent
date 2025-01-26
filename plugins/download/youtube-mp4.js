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
      const { title, video, author, description, duration, views, upload, thumbnail } = await ytmp4(text);            
      let caption = `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")} \n`
      caption += `⭔ *Title:* ${title}\n`
      caption += `⭔ *Author:* ${author}\n`
      caption += `⭔ *Description:* ${description}\n`
      caption += `⭔ *Duration:* ${duration}\n`
      caption += `⭔ *Views:* ${views}\n`
      caption += `⭔ *Upload:* ${upload}`
      if (/(ytmp4doc|ytvdoc)/.test(command)) {         
         m.reply(caption)
         conn.sendFile(m.chat, video, '', m, {
            document: true,
            fileName: `${title}~Ruhend-MD.mp4`,
            mimetype: 'video/mp4'
         })
      } else if (/(ytmp4|ytv)/.test(command)) {
         conn.adReply(m.chat, title, thumbnail, m).then(async () => {
            conn.sendFile(m.chat, video, {
               caption: caption,
               quoted: m
            })
         })
      }
   },
   limit: 3,
   premium: false
}