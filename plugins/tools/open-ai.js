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
         m.react('🔄', m.chat);
         let { GPT } = await import('free-gpt-turbo');                  
         let data = await GPT(text);
         await m.edReply('Waiting Response...', 100).then(() => {
            m.adReply(data, setting.thumbnail, m.chat);
         })
      } catch {
         let { response } = await Format.Beheaded(text);
         m.adReply(mess.wait, setting.thumbnail, m.chat).then(() => {         
            return m.adReply(response, setting.thumbnail, m.chat);      
         });
      }
   },
   limit: 4,
   register: true
};
