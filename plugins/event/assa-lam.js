module.exports = {
   start: async (m, {
      budy
   }) => {
      if (budy.toLowerCase().includes('assalamualaikum') || budy.toLowerCase().includes('assalamu\'alaikum')) {
         return m.reply('Waalaikumsalam')
      }
   }
}