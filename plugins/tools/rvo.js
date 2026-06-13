exports.default = {
   names: ['Tools'],
   tags: ['rvo', 'readviewonce', 'lihat', '👍'],
   command: ['rvo', 'readviewonce', 'lihat', '👍'],
   start: async (m, {
      conn,
      budy
   }) => {
      if (!m.quoted && budy === '👍') return false
      else if (m.quoted && budy === '👍' && !m?.quoted?.viewOnce) return false
      if (!m.quoted) return m.reply('Balas pesan 1x lihatnya');
      return await conn.viewOnce(m, m.chat, m.quoted.fakeObj);
   },
   limit: false
};