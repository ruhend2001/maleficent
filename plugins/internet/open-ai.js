const fetch = require('node-fetch');
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
      let url = `https://api.nyxs.pw/ai/gpt?text=${text}`
      let data = await (await fetch(url)).json();
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.adReply(m.chat, `${data.result}`, cover, m, {
            showAds: true
         });
      });
   },
   limit: 2
}