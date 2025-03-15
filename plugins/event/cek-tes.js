module.exports = {
   start: async (m, { 
      budy
   }) => {
      if (word(budy, 'tes')) {
         return m.reply('Apa Monyet ?');
      }
   }   
}