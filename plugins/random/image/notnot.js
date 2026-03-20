exports.default = {
   names: ['Image'],
   tags: ['notnot'],
   command: ['notnot'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/notnot.json');
      const notnot = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, notnot, {
         caption: '𝐍𝐎𝐓𝐍𝐎𝐓',
         quoted: m
      })
   },
   limit: true
}