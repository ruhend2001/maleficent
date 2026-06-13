const { Sfile } = require('../../lib/src/scraper/sfile.js');
exports.default = {
   names: ['Downloader'],
   tags: ['sfile'],
   command: ['sfile'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh: ${prefix+command} https://sfile.mobi/agJlyQTbq0T`);
      m.react('🍌')
      const data = (await Sfile(text)).data;
      const caption = `${head('*SFILE*')}\n` +
      `Name: ${data.filename}\n` +
      `Size: ${data.filesize}\n` +
      `Mimetype: ${data.mimetype}`
      conn.adReply(m.chat, caption, cover, m).then(() => {
         conn.sendFile(m.chat, data.result.buffer, '', m, {
            document: true,
            fileName: data.filename,
            mimetype: data.mimetype
         })
      })
   }
}