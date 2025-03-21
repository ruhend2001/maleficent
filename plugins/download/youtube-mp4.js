const savetube = require('../../lib/src/scraper/savetube.js');
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
      m.react('💿')
      const video = await savetube.download(text, '1080').catch(async () => await savetube.download(text, '720')).catch(async () => await savetube.download(text, '480')).catch(async () => await savetube.download(text, '360'));
      let caption = `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")} \n`
      caption += `⭔ *Title:* ${video.result.title}\n`     
      caption += `⭔ *Duration:* ${video.result.duration}\n\n`
      caption += `*Loading video sedang di kirim*`
      conn.adReply(m.chat, caption, video.result.thumbnail || cover, m, {
         showAds: true
      }).then(() => { // via document recommended
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