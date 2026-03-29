exports.default = {
   names: ['Anime Nsfw'],
   tags: ['bdsm'],
   command: ['bdsm'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/bdsm.json');   
      const bdsm = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, bdsm, {
         caption: '𝐁𝐃𝐒𝐌',
         quoted: m
      })
   },
   limit: true
}