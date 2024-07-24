exports.default = {
   names: ['Tools'],
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
      let result = await Format.GPT(text);
      conn.adReply(m.chat, loading, cover, m).then(() => {      
         conn.adReply(m.chat, `${result}`, cover, m, {
            showAds: true
         });
      });
   },
   limit: 2,
   register: true
};
