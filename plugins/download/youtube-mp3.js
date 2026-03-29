exports.default = {
   names: ['Downloader'],
   tags: ['ytmp3'],
   command: ['ytmp3', 'yta', 'ytaudio'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Masukan kontolnya! \nContoh: ${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('🎵')
      const audio = await Scraper.ocean(text, 'mp3').catch(async () => await Scraper.ocean(text, 'mp4', 144)).catch(async () => await Scraper.ocean(text, 'mp4', 240)).catch(async () => await Scraper.ocean(text, 'mp4', 360)).catch(async () => await Scraper.ocean(text, 'mp4', 480)).catch(async () => await Scraper.ocean(text, 'mp4', 720));
      conn.adReply(m.chat, loading, audio?.thumbnail || cover, m);
      const media = await Format.mp3(audio.media); 
      conn.sendFile(m.chat, media, '', m, {
         document: true,
         fileName: `${audio.title}~Ruhend-MD.mp3`,
         mimetype: 'audio/mpeg'
      })
   },
   limit: 2,
   premium: false
}