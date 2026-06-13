exports.default = {
   names: ['Anime Nsfw'],
   tags: ['neko'],
   command: ['neko'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/neko.json');
      const neko = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, neko, {
         caption: '𝐍𝐄𝐊𝐎',
         quoted: m
      })
   },
   limit: 2
}