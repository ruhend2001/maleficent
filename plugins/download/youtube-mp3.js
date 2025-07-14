const savetube = require('../../lib/src/scraper/savetube.js');
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
      const audio = await savetube.download(text, '144').catch(async () => await ocean(text, 'mp3'))
      conn.adReply(m.chat, loading, audio?.result?.thumbnail || audio?.thumbnail || cover, m);
      const media = await Format.mp3(await toBuffer(audio?.result?.download || audio?.link));   
      conn.sendFile(m.chat, media, '', m, {
         document: true,
         fileName: `${audio?.result?.title || audio?.title}~Ruhend-MD.mp3`,
         mimetype: 'audio/mpeg'
      })
   },
   limit: 2,
   premium: false
}