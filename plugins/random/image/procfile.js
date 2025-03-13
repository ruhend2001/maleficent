exports.default = {
   names: ['Image'],
   tags: ['procfile', 'proc'],
   command: ['procfile', 'proc'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://raw.githubusercontent.com/ruhend2001/database/main/random/procfile.json');
      const procfile = pickRandom(data);
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, procfile, {
         caption: '𝐏𝐑𝐎𝐂𝐅𝐈𝐋𝐄',
         quoted: m
      })
   },
   limit: true
}