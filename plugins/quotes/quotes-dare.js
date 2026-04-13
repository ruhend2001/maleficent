exports.default = {
   names: ['quotes'],
   tags: ['dare'],
   command: ['dare'],
   start: async (m, {
      conn
   }) => {
      const dare = await JSON_URL('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json');
      conn.reply(m.chat, pickRandom(dare), m);
   }
}