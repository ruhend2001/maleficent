exports.default = {
   names: ['Internet'],
   tags: ['gemini'],
   command: ['gemini', 'gem'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕐')
      const data = await Scraper.gemini(text);
      conn.adReply(m.chat, data.answer, 'https://files.catbox.moe/hio1la.jpg', m);
   },
   limit: true
}