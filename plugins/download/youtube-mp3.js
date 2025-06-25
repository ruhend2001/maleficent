const ocean = require('../../lib/src/scraper/ocean.js');
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
      m.react("🕗")
      const audio = await ocean(text, 'mp3');
      conn.adReply(m.chat, loading, audio.thumbnail || cover, m);
      const media = await Format.mp3(await toBuffer(audio.link));   
      conn.sendFile(m.chat, media, '', m, {
         document: true,
         fileName: `${audio.title}~Ruhend-MD.mp3`,
         mimetype: 'audio/mpeg'
      })
   },
   limit: 3,
   premium: false
}