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
      m.react('🕒', m.chat);
      let result = await Format.openAI(text);
      m.adReply(loading, setting.thumbnail, m.chat).then(() => {      
         m.adReply(`${result}`, setting.thumbnail, m.chat);
      });
   },
   limit: 3,
   register: true
};
