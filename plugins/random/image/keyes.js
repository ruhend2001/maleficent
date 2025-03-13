exports.default = {
   names: ['Image'],
   tags: ['keyes'],
   command: ['keyes'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/keyes.json');
      const keyes = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, keyes, {
         caption: '𝐊𝐄𝐘𝐄𝐒',
         quoted: m
      })
   },
   limit: true
}