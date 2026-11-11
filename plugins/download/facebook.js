const { fbdl } = require('ruhend-scraper')
exports.default = {
   tags: 'download',
   help: ['facebook'],
   command: ['facebook', 'fb'],
   start: async (m, { 
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`masukan url atau link facebook nya\ncontoh: ${prefix+command} https://www.facebook.com/share/r/18JH2gJRJQ`)
      const res = await fetchJSON(`https://ruhend-api.mywire.org/api/fbdl?url=${text}&key=${key}`)
      m.reply(wait)
      if (!res.data) throw res
      await conn.sendFile(m.chat, res.data.video.hd || res.data.video.sd, 'Facebook', m)
   },
   limit: 2
}