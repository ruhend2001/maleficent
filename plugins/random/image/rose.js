exports.default = {
   names: ['Image'],
   tags: ['rose'],
   command: ['rose'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/rose.json');
      const rose = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, rose, {
         caption: '𝐑𝐎𝐒𝐄',
         quoted: m
      })
   },
   limit: true
}