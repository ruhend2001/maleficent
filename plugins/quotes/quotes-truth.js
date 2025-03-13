exports.default = {
   names: ['quotes'],
   tags: ['truth'],
   command: ['truth'],
   start: async (m, {
      conn
   }) => {
      const truth = await JSON_URL('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json');
      conn.reply(m.chat, pickRandom(truth), m);
   }
}