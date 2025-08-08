exports.default = {
   names: ['Tools'],
   tags: ['getlid'],
   command: ['getlid'],
   start: async (m, {
      conn      
   }) => {
      const lid = await conn.getLid()
      if (!lid.endsWith('net')) {
         return m.reply(`lid / ID WhatsApp:\n${lid.replace('@lid', '')}`);
      } else {
         throw 'this group is not lid and you don\'t have to get the lid'
      }
   }
};