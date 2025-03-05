module.exports = {
   start: (m, { 
      budy
   }) => {
      if (budy.match(/^\s*tes\s*$/)) {
         m.reply('Apa Monkey ?');
      }
   }   
}