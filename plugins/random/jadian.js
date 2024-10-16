exports.default = {
   names: ['Fun'],
   tags: ['jadian'],
   command: ['jadian'],
   start: (m, {
      conn,
      participants
   }) => {
      const _user = participants.map(v => v.id);
      const x = pickRandom(_user);
      const y = pickRandom(_user);
      const mentions = [x, y]
      conn.adReply(m.chat, `Jadian 😋\n@${x.split('@')[0]}  ❤️ @${y.split('@')[0]}`, cover, m, {
         mentions: mentions,
         showAds: true
      })
   },
   group: true
}