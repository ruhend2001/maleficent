exports.default = {
   names: ['Tools'],
   tags: ['rvo', 'readviewonce', 'lihat'],
   command: ['rvo', 'readviewonce', 'lihat'],
   start: async (m, {
      conn
   }) => {
      await conn.viewOnce(m, m.chat)
   },
   limit: false
};