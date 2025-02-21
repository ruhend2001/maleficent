exports.default = {
   names: ['Internet'],
   tags: ['gemini', 'gem'],
   command: ['gemini', 'gem'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕐');
      const data = await Format.gemini(text);
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.adReply(m.chat, data, cover, m, {
            showAds: true
         });
      });
   },
   limit: true
}