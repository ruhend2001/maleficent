exports.default = {
   names: ['Internet'],
   tags: ['ai', 'gpt', 'chatgpt', 'openai'],
   command: ['ai', 'gpt', 'chatgpt', 'openai'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕐');
      const data = await Scraper.openAi(text);
      m.reply(loading), conn.adReply(m.chat, data, cover, m);
   },
   limit: true
}