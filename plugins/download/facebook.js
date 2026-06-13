const { fbdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['facebook'],
   command: ['fb', 'facebook', 'fbdl'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix+command} https://www.facebook.com/share/r/15i8ekGVQgF`);
      conn.adReply(m.chat, loading, cover, m)
      const data = await fbdl(text);
      for (let media of data) conn.sendFile(m.chat, media, '𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊', m), await sleep(2000)
   },
   limit: true,
   premium: false
}