const fetch = require('node-fetch');
exports.default = {
   names: ['Main Menu'],
   tags: ['menu'],
   command: ['menu', 'help', 'allmenu', 'command', 'm', 'all', 'meni'],
   start: async (m, {
      conn,
      prefix,
      command,
      Format
   }) => {
      let sosmed = `${setting.sosmed}`;
      //let jembut = ` ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ` // hiasan atas
      let garis = ` ══════════════════`
      let { Upload, Download } = await Format.statistic();
      let title = `${setting.botName}\n${setting.footer}`;
      let music = setting.music;      
      let lolim = logo_limit || 'Ⓛ'
      let loprem = logo_premium || 'Ⓟ'
      let header = `┌───`
      let middle = `│`
      let pointer = `⭓`
      let bottom = `└──────────⭓\n`
      let left = `『`
      let right = `』`    
      let bigHeader = false
      let top = { left, right, bigHeader }
      let info = `${star} Simple WhatsApp Bot \nBy ${setting.footer}\n${garis}\n`
      info += `Selamat ${waktu.suasana} Bangsat\n@${m.sender.split('@')[0]} 🐽\n`
      info += `📝 Total Penggunaan Perintah\n ‎ ‎ ‎ ‎ ‎ ‎ Bot Kamu: ${db.users[m.sender].hitCmd} Kali\n${garis}\n`
      info += `👤 Owner : wa.me/${setting.contact}\n`
      info += ` 📸 Instagram: ${sosmed}\n${garis}\n`
      info += ` Network Bot Usage :\n📥 Download: ${Download}\n📤 Upload: ${Upload}\n${garis}\n`
      info += `${lolim} = Limit\n${loprem} = Premium\n`
      info += `${garis}`
      m.react('🐽')
      let { menu } = await Format.Plugins(header, middle, pointer, bottom, prefix, top);
      let picture = await conn.profilePictureUrl(m.sender, 'image').catch(_ => setting.thumbnail);
      conn.adReply(m.chat, `${info}\n\n${menu}`, picture, m, {
         showAds: true
      });
      conn.sendFile(m.chat, music, {
         ptt: true,
         quoted: m
      })
   }
}