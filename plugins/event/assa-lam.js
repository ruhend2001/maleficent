module.exports = {
   start: async (m, {
      budy
   }) => {
      if (budy.match('assalamualaikum') || budy.match('assalamu\'alaikum')) {
         return m.reply('Waalaikumsalam')
      }
   }
}