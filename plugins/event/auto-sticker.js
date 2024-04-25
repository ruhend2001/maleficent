export let m = {
   start: async (m, {
      conn,
      quoted,
      User,
      command,
      autodl
   }) => {
      if (autodl && m.mtype === 'imageMessage') {
         let ignore = ['remini', 'hd', 'sticker', 's', 'stiker'];
         if (ignore.includes(command)) {
            return m.react('❎', m.chat)
         };
         if (User.checkLimitUser(m.sender) <= 0) {
            return m.adReply(mess.limit, setting.thumbnail, m.chat)
         };
         m.react('🐽', m.chat);
         let buffer = await quoted.download();
         m.react('🕒', m.chat);
         conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: setting.botName,
            author: setting.footer
         });
         User.Limit(m, m.sender, 2);
      }
   }
};
