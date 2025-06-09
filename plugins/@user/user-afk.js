exports.default = {
   names: ['User Menu'],
   tags: ['afk'],
   command: ['afk'],
   start: async (m, {
      text,
      conn
   }) => {
      const reason = text ? text : 'Ngewe'     
      const caption = `*Kamu Sekarang AFK Dengan Alasan:* *${reason}*`
      const tag = [m.sender]
      const tags = conn.parseMention(text) || [`@${m.sender.split('@')[0]}`];
      const isTags = tag.concat(tags) || tag;      
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