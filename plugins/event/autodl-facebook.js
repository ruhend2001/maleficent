import { igdl } from '../../lib/download.js'
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      if (autodl && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {
         if (budy.includes('.fb')) return;
         if (budy.match(/\.facebook\s/)) return;
         if (m.isBaileys) return;
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         };
         let res = await igdl(budy);
         m.react('🕒', m.chat)
         let data = res.data;
         for (let video of data) {
            conn.sendFile(m.chat, video.url, {
               caption: `🍌 Facebook`,
               quoted: m
            });
         }
         User.Limit(m, m.sender, 3);
      }
   }
};
