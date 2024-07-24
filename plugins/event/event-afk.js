module.exports = {
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
            let tags = conn.parseMention(reasonAfk) || [`@${m.sender.split('@')[0]}`];
            let isTags = m_tag.concat(tags) || m_tag;
            conn.adReply(m.chat, caption, cover, m, {
               mentions: isTags
            }).then(() => {
               User.afkBack(m.sender);
            });
         }
      };
      if (budy) {
         let user;
         try {
            user = m.message.extendedTextMessage.contextInfo.participant;
         } catch {
            return
         }         
         let _u = '@' + user.substring(0).split('@')[0];
         let __u = conn.parseMention(_u);
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
                  if (m.isBaileys) return;
                  let d = User.getProfileData(z).afkTime;
                  let e = User.getProfileData(z).afkReason;
                  let caption = `*Jangan Tag @${z.split('@')[0]}*\n*Dia Sedang Afk*\n*Dengan Alasan:* ${e === "" ? "" : `*${e}*`}\n*Selama:* ${clockString(new Date() - d)}`
                  let tag = [z];
                  let m_tag = [m.sender];
                  let tags = conn.parseMention(e) || [`@${m.sender.split('@')[0]}`];
                  let isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.adReply(m.chat, caption, cover, m, {
                     mentions: isTags           
                  });
               })
            }
         });
         let userAfks = conn.parseMention(budy);
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
                  let tags = conn.parseMention(e) || [`@${m.sender.split('@')[0]}`];
                  let isTags = m_tag.concat(tag).concat(tags) || m_tag;
                  conn.adReply(m.chat, caption, cover, m, {
                     mentions: isTags           
                  });
               })
            }
         })
      }
   }
}

const clockString = (ms) => {
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
   let toString = [`*${h} Jam*`, `*${m} Menit*`, `*${s} Detik*`].map(v => v.toString().padStart(2, 0)).join(': ')
   return `${toString}`
}