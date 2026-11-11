exports.default = {
   start: async (m, {
      conn
   }) => {
      if (word(m?.text, "🗿")) {
         return m.react("🍌")
      }
      if (word(m?.text, 'tes')) {
         return conn.reply(m.chat, 'Apa Monyet 🐒 ?', m);
      }      
   }
}