exports.default = {
   names: ['Anime Nsfw'],
   tags: ['yuri'],
   command: ['yuri'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/yuri.json');
      const yuri = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, yuri, {
         caption: '𝐘𝐔𝐑𝐈',
         quoted: m
      })
   },
   limit: true
}