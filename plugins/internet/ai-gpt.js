exports.default = {
   names: ['Internet'],
   tags: ['ai', 'chatgpt', 'openai'],
   command: ['ai', 'chatgpt', 'openai'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕒');
      //https://api.ryzendesu.vip/api/ai/chatgpt?text=
      const data = await JSON_URL('https://btch.us.kg/openai?text=' + text);
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.adReply(m.chat, data.result, cover, m, {
            showAds: true
         });
      });
   },
   limit: 2
}