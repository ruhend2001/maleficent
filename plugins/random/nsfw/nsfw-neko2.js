exports.default = {
   names: ['Anime Nsfw'],
   tags: ['neko2'],
   command: ['neko2'],
   start: async (m, {
      conn
   }) => {
      const data = await JSON_URL('https://nekos.life/api/v2/img/waifu'); 
      const neko2 = data.url
      conn.adReply(m.chat, loading, cover, m);
      conn.sendFile(m.chat, neko2, {
         caption: '𝐍𝐄𝐊𝐎',
         quoted: m
      })
   },
   limit: true
}