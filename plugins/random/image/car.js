exports.default = {
   names: ['Image'],
   tags: ['car'],
   command: ['car'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/car.json');
      const car = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, car, {
         caption: '𝐂𝐀𝐑',
         quoted: m
      })
   },
   limit: true
}