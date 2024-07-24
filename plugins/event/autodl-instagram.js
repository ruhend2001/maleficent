const { igdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      if (autodl && budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g)) {
         if (budy.includes('.ig')) return;
         if (budy.match(/\.instagram\s/)) return;
         if (User.checkLimitUser(m.sender) <= 0) return m.reply(mess.limit);
         m.react('🕘')
         let res = await igdl(budy);
         let data = await res.data;
         if (data.length > 0) {
            for (let i of data) {
               conn.sendFile(m.chat, i.url, {
                  quoted: m
               });
            }
            User.Limit(conn, 3, m);
         } else {
            return m.reply(`Media tidak ditemukan`);
         }
      }
   }
};
