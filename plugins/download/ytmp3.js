exports.default = {
   tags: 'download',
   help: ['ytmp3'],
   command: ['ytmp3', 'yta'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan kontolnya! \nContoh: ${prefix+command} https://youtu.be/MvsAesQ-4zA`);       
      m.react('🎵')
      const res = await fetchJSON(`https://ruhend-api.mywire.org/api/ytmp3?url=${text}&key=${key}`)
      if (!res?.data) throw res
      conn.adReply(m.chat, wait, res?.data?.thumbnail || cover, m);
      const media = await Utils.mp3Play(await toBuffer(res.data.link));
      await conn.sendFile(m.chat, media, '', m, {
         asDocument: true,
         fileName: `${res.data.title}~Ruhend-MD.mp3`,
         mimetype: 'audio/mpeg'
      })
   },
   limit: 2
}