const fetch = require('node-fetch');
exports.default = {
   names: ['Main Menu'],
   tags: ['menu'],
   command: ['menu', 'help', 'allmenu', 'command', 'm', 'all'],
   start: async (m, {
      conn,
      prefix,
      command,
      Format
   }) => {
      let sosmed = `${setting.sosmed}`;
      let jembut = ` ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ `; // hiasan atas
      let { Upload, Download } = await Format.statistic();
      let title = `${setting.botName}\n${setting.footer}`;
      let music = setting.music;
      let header = '❏═┅═'
      let middle = '│'
      let pointer = '︎⭓'
      let bottom = '│\n❏═━═┅═┅═┅═┅═⭓'
      let left = '『'
      let right = '』\n│'      
      let bigHeader = true
      let top = { left, right , bigHeader}
      let info = `${star} Simple WhatsApp Bot \nBy ${setting.footer}\n\n`
      info += `Selamat ${waktu.suasana} bangsat\n@${m.sender.split('@')[0]} 🐽\n`
      info += `📝 Total Penggunaan Perintah\n ‎ ‎ ‎ ‎ ‎ ‎ Bot Kamu: ${db.users[m.sender].hitCmd} Kali\n`
      info += `👤 Owner : wa.me/${setting.contact}\n`
      info += ` 📸 Instagram: ${sosmed}\n\n`
      info += ` Network Bot Usage :\n📥 Download: ${Download}\n📤 Upload: ${Upload}\n\n${jembut}`
      m.react('🐽')      
      let { menu } = await Format.Plugins(header, middle, pointer, bottom, prefix, top);
      let picture = await conn.profilePictureUrl(m.sender, 'image').catch(_ => setting.thumbnail);
      conn.adReply(m.chat, `${info}\n\n${menu}`, picture, m, {
         showAds: true
      })
      conn.sendFile(m.chat, music, {
         mimetype: 'audio/mp4',
         ptt: true,
         quoted: m,
         contextInfo: {
            externalAdReply: {
               mediaType: 1,
               title: 'Menunya Kak :)',
               sourceUrl: setting.group.link,
               thumbnail: await (await fetch(picture)).buffer()
            }
         }
      })
   }
};
