exports.default = {
   names: ['Image'],
   tags: ['justina'],
   command: ['justina'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/justina.json');
      const justina = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, justina, {
         caption: '𝐉𝐔𝐒𝐓𝐈𝐍𝐀',
         quoted: m
      })
   },
   limit: true
}