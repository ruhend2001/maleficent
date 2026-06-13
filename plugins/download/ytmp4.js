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
      let caption = `${head("YouTube")}\n`
      // const data = await Scraper.ocean(text, 'mp4', command == 'ytmp4_1080' || command == 'ytv_1080' ? 1080 : 720).catch(async () => await Scraper.ocean(text, 'mp4', 480)).catch(async () => await Scraper.ocean(text, 'mp4', 360));       
      const video = await Scraper.ytdown(text, 'video');     
      caption += `*Title:* ${video.title}\n\n`
      caption += `*Loading video sedang di kirim*`;        
      conn.adReply(m.chat, caption, video?.thumbnail.split('?')[0], m);      
      conn.sendFile(m.chat, video.media, '', m, {
         document: true,
         fileName: `${video.title}~Ruhend-MD.mp4`,
         mimetype: 'video/mp4'
      })
   },
   limit: 3,
   premium: false
}