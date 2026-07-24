exports.default = {
   names: ['Tools'],
   tags: ['delete'],
   command: ['delete', 'del', 'd'],
   start: async (m, {
      conn,
   }) => {
      if (!m.quoted) return m.reply('Balas pesan yang mau di hapus! \n\nreply to the message you want to delete!');		
      return await conn.removeMessage(m)
   },
   premium: true
};
