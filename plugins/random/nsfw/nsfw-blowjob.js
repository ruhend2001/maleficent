exports.default = {
   names: ['Anime Nsfw'],
   tags: ['blowjob'],
   command: ['blowjob'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/blowjob.json');     
      const blowjob = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, blowjob, {
         caption: '𝐁𝐋𝐎𝐖𝐉𝐎𝐁',
         quoted: m
      })
   },
   limit: true
}