const { ytmp3v3 } = require('ruhend-scraper');
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
      let { title, audio } = await ytmp3v3(text);
      m.react("🕗");
      let buffer = await Format.getBuffer(audio);
      let result = await Format.mp3(buffer);
      conn.adReply(m.chat, loading, cover, m).then(() => {         
         conn.sendMessage(m.chat, { document: result, fileName: `${title}~Ruhend-MD.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
      })
   },
   limit: 3,
   premium: false
}