exports.default = {
   names: ['Group Menu'],
   tags: ['hidetag'],
   command: ['ht', 'h', 'hidetag'],
   start: async (m, {
      conn,
      text,
      quoted,
      participants
   }) => {
      let mem = [];
      participants.map(i => mem.push(i.id))
      conn.adReply(m.chat, m?.quoted?.text ? m?.quoted?.text : text ? text : '', cover, m, {
         showAds: true,
         mentions: mem
      })
   },
   group: true,
   admin: true
};