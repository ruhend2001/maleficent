exports.default = {
   names: ['Internet'],
   tags: ['fetch'],
   command: ['fetch', 'get'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`masukan link atau url \ncontoh: ${prefix+command} https://www.google.com`);
      if (!text.match(/http|https/g)) return m.reply(`link salah awali dengan http atau https`);
      m.reply(loading)
      return await Format.getFetch(conn, text, m);
   },
   limit: 2,
   register: false
};