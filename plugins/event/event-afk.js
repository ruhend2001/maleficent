module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {      
      const timeAfk = db.users[m.sender].afkTime
      const reasonAfk = db.users[m.sender].afkReason
      const senderBackAfk = timeAfk === -1;
      if (!senderBackAfk && budy && !m.isBaileys) {
         const caption = `*Kamu Berhenti AFK*\n*Setelah:* ${reasonAfk === "" ? "" : `${reasonAfk}`}\n*Selama:*\n${clockString(new Date() - timeAfk)}`
         const m_tag = [m.sender]
         const tags = m.isLid ? conn.parseMentionLid(reasonAfk) || [`@${m.sender.split('@')[0]}`] : conn.parseMention(reasonAfk) || [`@${m.sender.split('@')[0]}`];
         const isTags = m_tag.concat(tags) || m_tag;
         conn.adReply(m.chat, caption, cover, m, {
            mentions: isTags
         }).then(() => {
            db.users[m.sender].afkTime = -1
            db.users[m.sender].afkReason = ''
         })
      };
      if (budy) {
         let user
         try {
            user = m.message.extendedTextMessage.contextInfo.participant || '0@s.whatsapp.net'
         } catch {
            return
         }
         const _u = '@' + user.substring(0).split('@')[0];
         const __u = m.isLid ? conn.parseMentionLid(_u) : conn.parseMention(_u);
         __u.forEach(i => {
            let _timeAfk;
            try {
               _timeAfk = db.users[i].afkTime
            } catch {
               return
            }
            const v = (_timeAfk !== -1);
            if (v && !m.isBaileys) {
               const x = [i];
               x.forEach((z) => {
                  const d = db.users[z].afkTime
                  const e = db.users[z].afkReason;
                  const caption = `*Jangan Tag* *@${z.split('@')[0]}*\n*Dia Sedang Afk*\n*Dengan Alasan:* ${e === "" ? "" : `*${e}*`}\n*Selama:*\n${clockString(new Date() - d)}`
                  const tag = [z];
                  const m_tag = [m.sender];
                  const tags = m.isLid ? conn.parseMentionLid(e) || [`@${m.sender.split('@')[0]}`] : conn.parseMention(e) || [`@${m.sender.split('@')[0]}`];
                  const isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.adReply(m.chat, caption, cover, m, {
                     mentions: isTags
                  })
               })
            }
         });
         const userAfks = m.isLid ? conn.parseMentionLid(budy) : conn.parseMention(budy);
         userAfks.forEach(i => {
            let _timeAfk;
            try {
               _timeAfk = db.users[i].afkTime
            } catch {
               return
            }
            const v = (_timeAfk !== -1);
            if (v && !m.isBaileys) {
               const x = [i];
               x.forEach((z) => {
                  const d = db.users[z].afkTime
                  const e = db.users[z].afkReason;
                  const caption = `*Jangan Tag* *@${z.split('@')[0]}*\n*Dia Sedang Afk*\n*Dengan Alasan:* ${e === "" ? "" : `${e}`}\n*Selama:*\n${clockString(new Date() - d)}`
                  const tag = [z];
                  const m_tag = [m.sender];
                  const tags = m.isLid ? conn.parseMentionLid(e) || [`@${m.sender.split('@')[0]}`] : conn.parseMention(e) || [`@${m.sender.split('@')[0]}`];
                  const isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.adReply(m.chat, caption, cover, m, {
                     mentions: isTags
                  })
               })
            }
         })
      }
   }
};
const clockString = (ms) => {
   const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
   const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
   const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
   const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
   return [`*${d} Hari*`, `*${h} Jam*`, `*${m} Menit*`, `*${s} Detik*`].map(v => v.toString().padStart(2, 0)).join(': ')
};