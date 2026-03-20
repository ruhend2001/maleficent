exports.default = {
   names: ['Anime Nsfw'],
   tags: ['milf'],
   command: ['milf'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/milf.json'); 
      const milf = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, milf, {
         caption: '𝐌𝐈𝐋𝐅',
         quoted: m
      })
   },
   limit: true
}