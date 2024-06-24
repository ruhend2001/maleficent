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
         m.react('🔁', m.chat);     
         let { response } = await Format.Beheaded(text);
         m.adReply(loading, setting.thumbnail, m.chat).then(() => {      
            m.adReply(response, setting.thumbnail, m.chat);
         });     
      } catch {
         m.react('🔄', m.chat);     
         let chat = await Format.openAI(text);
         m.adReply(loading, setting.thumbnail, m.chat).then(() => {      
            return m.adReply(chat, setting.thumbnail, m.chat);
         });
      }
   },
   limit: 3,
   register: true
};
