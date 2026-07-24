exports.default = {
   names: ['Image'],
   tags: ['aesthetic'],
   command: ['aesthetic'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/aesthetic.json');
      const aesthetic = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, aesthetic, {
         caption: '𝗔𝗘𝗦𝗧𝗛𝗘𝗧𝗜𝗖',
         quoted: m
      })
   },
   limit: true
}