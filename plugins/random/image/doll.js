exports.default = {
   names: ['Image'],
   tags: ['doll'],
   command: ['doll'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/doll.json');
      const doll = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, doll, {
         caption: '𝐃𝐎𝐋𝐋',
         quoted: m
      })
   },
   limit: true
}