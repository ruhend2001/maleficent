exports.default = {
   names: ['Tools'],
   tags: ['tourl', 'upload'],
   command: ['tourl', 'upload'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted
   }) => {
      if (/image|video|audio|webp/.test(mime)) {
         m.reply(loading)
         const result = await Scraper.uploadMoe(await conn.download(quoted));
         const caption = `Upload Berhasil √ \n${result}`
         return conn.adReply(m.chat, caption, cover, m);
      } else {
         return m.reply(`Balas Media Atau Kirim Media Dengan Caption ${prefix}upload atau ${prefix}tourl`);
      }
   },
   limit: 3,
   register: false,
   premium: false
}