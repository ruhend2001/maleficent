exports.default = {
   names: ['Tools'],
   tags: ['q'],
   command: ['q'],
   start: async (m, {
      store
   }) => {
      if (!m.quoted) return m.reply('balas pesan yang mengandung quoted');
      try {
         await store.loadMessage(m.chat, m.quoted.id).then(msg => {
            return m.reply(msg.quoted.text);
         });
      } catch {
         throw 'Unable to get quoted'
      }
   }
}