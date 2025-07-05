module.exports = {
   start: async (m, { 
      budy
   }) => {
      if (word(budy, 'tes') && !m.isBaileys) {
         return m.reply('Apa Monyet ?');
      }
   }   
}