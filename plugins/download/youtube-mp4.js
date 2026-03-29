exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4', 'ytmp4_1080'],
   command: ['ytmp4', 'ytv', 'ytmp4_1080', 'ytv_1080'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('📥')
      let caption = `${head("𝐘𝐎𝐔𝐓𝐔𝐁𝐄")}\n`
      const data = await Scraper.ocean(text, 'mp4', command == 'ytmp4_1080' || command == 'ytv_1080' ? 1080 : 720).catch(async () => await Scraper.ocean(text, 'mp4', 480)).catch(async () => await Scraper.ocean(text, 'mp4', 360)); 
      caption += `*Title:* ${data.title}\n\n`
      caption += `*Loading video sedang di kirim*`
      conn.adReply(m.chat, caption, data.thumbnail || cover, m, {
         showAds: true
      }).then(() => {
         conn.sendFile(m.chat, data.media, '', m, {
            document: true,
            fileName: `${data.title}-${command == 'ytmp4_1080' || command == 'ytv_1080' ? 1080 : 720}~Ruhend-MD.mp4`,
            mimetype: 'video/mp4'
         })
      })
   },
   limit: 3,
   premium: false
}