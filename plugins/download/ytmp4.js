exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4'],
   command: ['ytmp4', 'ytv', 'ytvideo', 'ytvid'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('📥')      
      const video = await Scraper.y2mate(text, 'mp4');
      const { thumbnail } = await Scraper.getInfoYoutube(text);
      const caption = `${head("YouTube")}\n` +
      `*Title:* ${video.title}\n\n` +
      `*Loading video sedang di kirim*`;        
      conn.adReply(m.chat, caption, thumbnail, m);      
      conn.sendFile(m.chat, video.url, '', m, {
         document: true,
         fileName: `${video.title}-${video.quality}~Ruhend-MD.mp4`,
         mimetype: 'video/mp4'
      })
   },
   limit: 3,
   premium: false
}