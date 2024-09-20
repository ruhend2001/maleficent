exports.default = {
   names: ['Info'],
   tags: ['listafk', 'userafk'],
   command: ['listafk', 'userafk'],
   start: async (m, {
      conn
   }) => {
      const afk = Object.entries(db.users).filter(v => {
         const user = v[1].afkTime == -1
         const data = !user
         return data
      });
      const clockString = (ms) => {
         let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
         let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
         let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
         let toString = [`*${h} Jam*`, `*${m} Menit*`, `*${s} Detik*`].map(v => v.toString().padStart(2, 0)).join(': ')
         return `${toString}`
      };
      const users = afk.map(([jid, user], i) => {
         return {
            jid: jid,
            name: user.name,
            timeAfk: clockString(new Date() - db.users[jid].afkTime),
            num: i + 1
         };
      });
      const data = users.map(user => `${user.num}. ${user.name}\n Nomor:\n@${user.jid.split('@')[0]}\n AFK Selama:\n${user.timeAfk}\n`).join('\n');
      const jid = conn.parseMention(data);
      conn.adReply(m.chat, `*List User AFK*\n*${setting.botName}*\n\n${data}`.trim(), cover, m, {
         mentions: jid
      })
   }
}