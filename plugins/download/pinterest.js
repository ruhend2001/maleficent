exports.default = {
   names: ['Downloader'],
   tags: ['pinterest'],
   command: ['pinterest', 'pin'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh: ${prefix+command} Input Query`)
      const image = await Format.Scraper.pinterest(text);   
      if (image.length == 0) return m.reply('Tidak di temukan');
      conn.adReply(m.chat, loading, cover, m);
      const caption = `${head('𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓')}\n` +
      `${java} Result From ${text}`
      conn.sendButton(m.chat, caption, pickRandom(image), m, [ 
         ['Next', '.pinterest ' + text]
      ])
   },
   limit: 2,
   premium: false
}