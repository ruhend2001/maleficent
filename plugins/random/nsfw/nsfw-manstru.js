exports.default = {
   names: ['Anime Nsfw'],
   tags: ['manstrubation', 'manstru'],
   command: ['manstrubation', 'manstru'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/manstrubation.json');     
      const manstrubation = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, manstrubation, {
         caption: '𝐌𝐀𝐍𝐒𝐓𝐑𝐔𝐁𝐀𝐓𝐈𝐎𝐍',
         quoted: m
      })
   },
   limit: true
}