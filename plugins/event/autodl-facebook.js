import { fbdl } from '../../lib/download.js'
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      if (autodl && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         };
         m.react('🕒', m.chat)
         let { video } = await fbdl(budy);
         m.react('🕗', m.chat)
         conn.sendFile(m.chat, video, {
            caption: `🍌 Facebook`,
            quoted: m
         });
         User.Limit(m, m.sender, 4);
      }
   }
};