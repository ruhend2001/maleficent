exports.default = {
   names: ['Anime'],
   tags: ['megumin'],
   command: ['megumin'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/megumin.json');
      const megumin = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, megumin, {
         caption: '𝐌𝐄𝐆𝐔𝐌𝐈𝐍',
         quoted: m
      })
   },
   limit: true
}