exports.default = {
   names: ['Anime'],
   tags: ['loli'],
   command: ['loli'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/loli.json');
      const loli = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, loli, {
         caption: '𝐋𝐎𝐋𝐈',
         quoted: m
      })
   },
   limit: true
}