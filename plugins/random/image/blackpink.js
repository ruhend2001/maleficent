exports.default = {
   names: ['Image'],
   tags: ['blackpink'],
   command: ['blackpink'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/blackpink.json');
      const blackpink = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, blackpink, {
         caption: '𝐁𝐋𝐀𝐂𝐊𝐏𝐈𝐍𝐊',
         quoted: m
      })
   },
   limit: true
}