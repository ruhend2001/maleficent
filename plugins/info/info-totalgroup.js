exports.default = {
   names: ['Info'],
   tags: ['totalgroup', 'totalgc'],
   command: ['totalgroup', 'totalgc'],
   start: (m, {
      conn
   }) => {
      const group = Object.keys(db.chats).length;
      const caption = `Total group ${setting.botName}\nsaat ini adalah ${group} group`
      conn.adReply(m.chat, caption, cover, m);
   }
}