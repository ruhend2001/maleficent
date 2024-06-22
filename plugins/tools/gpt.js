export default {
   names: ['Tools'],
   tags: ['gpt'],
   command: ['gpt'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      const { GPT } = await import('free-gpt-turbo');
      if (!text) return m.reply(`Masukan text chat nya! \nContoh: ${prefix + command} apa kabar`);
      m.reply(loading);
      const data = await GPT(text);
      m.adReply(data, setting.thumbnail, m.chat);
   },
   limit: 3,
   register: true
};