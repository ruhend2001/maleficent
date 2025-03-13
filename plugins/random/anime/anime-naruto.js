exports.default = {
   names: ['Anime'],
   tags: ['naruto'],
   command: ['naruto'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/naruto.json');
      const naruto = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, naruto, {
         caption: '𝐍𝐀𝐑𝐔𝐓𝐎',
         quoted: m
      })
   },
   limit: true
}