exports.default = {
   names: ['Image'],
   tags: ['program'],
   command: ['program'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/program.json');
      const program = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, program, {
         caption: '𝐏𝐑𝐎𝐆𝐑𝐀𝐌',
         quoted: m
      })
   },
   limit: true
}