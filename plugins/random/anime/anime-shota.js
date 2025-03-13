exports.default = {
   names: ['Anime'],
   tags: ['shota'],
   command: ['shota'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/shota.json');
      const shota = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, shota, {
         caption: '𝐒𝐇𝐎𝐓𝐀',
         quoted: m
      })
   },
   limit: true
}