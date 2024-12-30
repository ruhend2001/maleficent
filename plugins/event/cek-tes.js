module.exports = {
   start: async (m, { 
      budy
   }) => {
      if (budy.match(/^\s*tes\s*$/)) {
         m.reply('Apaan ?');
      }
   }   
}