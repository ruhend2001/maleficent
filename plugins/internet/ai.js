exports.default = {
   names: ['Internet'],
   tags: ['gemini', 'gem', 'ai', 'chatgpt', 'openai'],
   command: ['gemini', 'gem', 'ai', 'chatgpt', 'openai'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕐');
      const data = await Scraper.gemini(text);
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.adReply(m.chat, data, cover, m, {
            showAds: true
         });
      });
   },
   limit: true
}