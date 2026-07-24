exports.default = {
   names: ['Tools'],
   tags: ['removebg', 'rbg'],
   command: ['removebg', 'rbg'],
   start: async (m, {
      conn,
      text,      
      mime,
      quoted
   }) => {
      if (!(/image/.test(mime))) {
         return m.reply('balas atau kirim gambar nya!')
      } else if (/image/.test(mime)) {
         const data = await Scraper.removeBG(await conn.download(quoted))
         return m.reply(data)
      }
   },
   limit: 3
}