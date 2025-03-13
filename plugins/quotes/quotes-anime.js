 exports.default = {
   names: ['quotes'],
   tags: ['quotesanime'],
   command: ['quotesanime'],
   start: async (m, {
      conn
   }) => {
      const json = await JSON_URL('https://katanime.vercel.app/api/getrandom?limit=1');
      const { indo, character, anime } = json.result[0];
      conn.reply(m.chat, `By: ${character}\nAnime: ${anime}\n\n*${indo}*`, m);
   }
}