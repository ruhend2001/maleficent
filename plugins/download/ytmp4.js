exports.default = {
   tags: 'download',
   help: ['ytmp4'],
   command: ['ytmp4', 'ytv'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya contoh:\n${prefix+command} https://youtu.be/MvsAesQ-4zA`);
      m.react('📥')
      const res = await fetchJSON(`https://ruhend-api.mywire.org/api/ytmp4?url=${text}&quality=720&key=${key}`)      
      if (!res?.data) throw res
      const caption = '*YOUTUBE*\n\n' +
      `*${res.data.title}*\n` +
      `*${res.data.description}*\n\n` +
      `*Loading video sedang di kirim*`;
       await conn.adReply(m.chat, caption, res.data.thumbnail, m);
       await conn.sendFile(m.chat, res.data.link, '', m, {
          asDocument: true,
          fileName: `${res.data.title}-${res.data.quality || ''}~Ruhend-MD.mp4`,
          mimetype: 'video/mp4'
       })
   },
   limit: 2
}