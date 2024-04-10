import fetch from 'node-fetch'
export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      let domain = budy.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g);
      let exc = budy.includes('User')
      if (autodl && !exc && domain && domain.length > 0) {
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.reply(mess.limit);
         };
         try {
            let res = await fetch(`https://vihangayt.me/download/instagram?url=${domain[0]}`);
            let igeh = await res.json();
            m.react('🕒', m.chat)
            if (igeh.data && igeh.data.data.length > 0) {
               for (let i of igeh.data.data) {
                  conn.sendFile(m.chat, i.url, {
                     quoted: m
                  });
               }
               User.Limit(m, m.sender, 5);
            } else {
               m.reply(`Media tidak ditemukan`);
            }
         } catch (error) {
            if (m.isBaileys) return;
            console.log(error);
            return m.reply(`Terjadi kesalahan saat mengambil data Instagram\n${error}`);
         }
      }
   }
};
