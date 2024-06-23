export default {
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
      m.react('🔁', m.chat);     
      let { response } = await Format.Beheaded(text);
      m.adReply(loading, setting.thumbnail, m.chat).then(() => {      
         m.adsReply(response, setting.thumbnail, m.chat);
      });
   },
   limit: 5,
   register: true
};
