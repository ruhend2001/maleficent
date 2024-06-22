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
      try {
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let { response } = await Format.Beheaded(text);
         await m.adReply(response, setting.thumbnail, m.chat);
      } catch {
         let { GPT } = await import('free-gpt-turbo');
         m.reply(`${loading} v2`);
         let data = await GPT(text);
         return m.adReply(data, setting.thumbnail, m.chat);  
      }
   },
   limit: 5,
   register: true
};
