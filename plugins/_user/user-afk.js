export let m = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (m.sender) {
         let timeAfk = User.getProfileData(m.sender).afkTime;
         let reasonAfk = User.getProfileData(m.sender).afkReason;
         let senderBackAfk = timeAfk === -1;
         if (!senderBackAfk && budy) {
            if (m.isBaileys) return;
            let caption = `*Kamu Berhenti AFK*\n*Setelah:* ${reasonAfk === "" ? "" : `*${reasonAfk}*`}\n*Selama:* ${clockString(new Date() - timeAfk)}`
            let m_tag = [m.sender]
            let tags = parseMention(reasonAfk) || `@${m.sender.split('@')[0]}`
            let isTags = m_tag.concat(tags) || m_tag;
            conn.sendMessage(m.chat, {
               text: caption,
               mentions: isTags
            }, {
               quoted: m
            }).then(() => {
               User.afkBack(m.sender);
            });
         }
      };
      if (budy) {
         let user = m.message.extendedTextMessage.contextInfo.participant;
         let _u = '@' + user.substring(0).split('@')[0];
         let __u = parseMention(_u);
         __u.forEach(i => {
            let _timeAfk;
            try {
               _timeAfk = User.getProfileData(i).afkTime;
            } catch {
               return
            }
            let v = (_timeAfk !== -1);
            if (v) {
               let x = [i];
               x.forEach((z) => {
                  if (m.isBaileys) return
                  let d = User.getProfileData(z).afkTime;
                  let e = User.getProfileData(z).afkReason;
                  let caption = `*Jangan Tag @${z.split('@')[0]}*\n*Dia Sedang Afk*\n*Dengan Alasan:* ${e === "" ? "" : `*${e}*`}\n*Selama:* ${clockString(new Date() - d)}`
                  let tag = [z];
                  let m_tag = [m.sender];
                  let tags = parseMention(e) || `@${m.sender.split('@')[0]}`
                  let isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.sendMessage(m.chat, {
                     text: caption,
                     mentions: isTags
                  }, {
                     quoted: m
                  });
               })
            }
         });
         let userAfks = parseMention(budy);
         userAfks.forEach(i => {
            let _timeAfk;
            try {
               _timeAfk = User.getProfileData(i).afkTime;
            } catch {
               return
            }
            let v = (_timeAfk !== -1);
            if (v) {
               let x = [i];
               x.forEach((z) => {
                  if (m.isBaileys) return
                  let d = User.getProfileData(z).afkTime;
                  let e = User.getProfileData(z).afkReason;
                  let caption = `*Jangan Tag @${z.split('@')[0]}*\n*Dia Sedang Afk*\n*Dengan Alasan:* ${e === "" ? "" : `*${e}*`}\n*Selama:* ${clockString(new Date() - d)}`
                  let tag = [z];
                  let m_tag = [m.sender];
                  let tags = parseMention(e) || `@${m.sender.split('@')[0]}`
                  let isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.sendMessage(m.chat, {
                     text: caption,
                     mentions: isTags
                  }, {
                     quoted: m
                  });
               })
            }
         })
      }
   }
}

export default {
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
      let caption = `*Kamu Sekarang AFK Dengan Alasan ${reason}*`
      let tag = [m.sender]
      let tags = parseMention(text) || `@${m.sender.split('@')[0]}`
      let isTags = tag.concat(tags) || tag;
      conn.sendMessage(m.chat, {
         text: caption,
         mentions: isTags
      }, {
         quoted: m
      }).then(() => {
         User.dbPlus(m.sender, {
            afkTime: +new Date
         });
      });
   },
   group: true
};
const parseMention = (text = '') => {
   return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
const clockString = (ms) => {
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
   let toString = [`*${h} Jam*`, `*${m} Menit*`, `*${s} Detik*`].map(v => v.toString().padStart(2, 0)).join(': ')
   return `${toString}`
}
