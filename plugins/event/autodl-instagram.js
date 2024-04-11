import { igdl } from '../../lib/download.js';
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      let domain = budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g);
      if (autodl && domain) {
         if (budy.includes('.ig')) return;
         if (budy.match(/\.instagram\s/)) return;
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         };
         m.react('🕘', m.chat)
         let res = await igdl(`${domain[0]}`);
         let data = await res.data;
         if (data.length > 0) {
            for (let i of data) {
               conn.sendFile(m.chat, i.url, {
                  quoted: m
               });
            }
            User.Limit(m, m.sender, 2);
         } else {
            return m.reply(`Media tidak ditemukan`);
         }
      }
   }
};
