exports.default = {
   names: ['User Menu'],
   tags: ['afk'],
   command: ['afk'],
   start: async (m, {
      text,
      conn
   }) => {
      const reason = text ? text : 'Ngewe';
      const caption = `Kamu Sekarang AFK Dengan Alasan: ${reason}`;      
      const mention = text.includes('@') ? conn.parseMentionLid2(text) : [''];
      const isTags = [m.sender].concat(mention);
      conn.adReply(m.chat, caption, cover, m, {
         mentions: isTags,
         showAds: false
      }).then(() => {
         db.users[m.sender].afkReason = reason
         db.users[m.sender].afkTime = + new Date         
      })
   },
   group: false
}