exports.default = {
   names: ['User Menu'],
   tags: ['afk'],
   command: ['afk'],
   start: async (m, {
      text,
      conn,
      User
   }) => {
      let isAfk = User.getProfileData(m.sender).afkTime
      let senderAfk = isAfk === -1;
      if (!senderAfk) return
      let reason = text ? text : 'Ngewe'
      User.afkReason(m.sender, reason);
      let caption = `*Kamu Sekarang AFK Dengan Alasan: ${reason}*`
      let tag = [m.sender]
      let tags = conn.parseMention(text) || [`@${m.sender.split('@')[0]}`];
      let isTags = tag.concat(tags) || tag;      
      conn.adReply(m.chat, caption, cover, m, {
         mentions: isTags,
         showAds: false
      }).then(() => {
         User.dbPlus(m.sender, {
            afkTime: +new Date
         });
      });
   },
   group: true
};