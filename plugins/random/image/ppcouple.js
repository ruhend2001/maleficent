exports.default = {
   names: ['Image'],
   tags: ['ppcp', 'ppcouple'],
   command: ['ppcp', 'ppcouple'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/ppcp.json');
      const ppcp = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, ppcp, {
         caption: '𝐏𝐏𝐂𝐏',
         quoted: m
      })
   },
   limit: true
}