exports.default = {
   names: ['Anime'],
   tags: ['yuki'],
   command: ['yuki'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/yuki.json');
      const yuki = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, yuki, {
         caption: '𝐘𝐔𝐊𝐈',
         quoted: m
      })
   },
   limit: true
}