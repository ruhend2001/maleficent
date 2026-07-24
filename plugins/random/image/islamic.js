exports.default = {
   names: ['Image'],
   tags: ['islamic'],
   command: ['islamic'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/islamic.json');
      const islamic = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, islamic, {
         caption: '𝐈𝐒𝐋𝐀𝐌𝐈𝐂',
         quoted: m
      })
   },
   limit: true
}