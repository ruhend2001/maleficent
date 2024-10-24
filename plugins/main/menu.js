exports.default = {
   names: ['Main Menu'],
   tags: ['menu'],
   command: ['menu', 'help', 'allmenu', 'command', 'm', 'all', 'meni'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      let sosmed = `${setting.sosmed}`;
      let garis = ` ═══════════════`;
      let { Upload, Download } = await Format.statistic();
      let title = `${setting.botName}\n${setting.footer}`;
      let music = setting.music;
      let lolim = logo_limit || 'Ⓛ';
      let loprem = logo_premium || 'Ⓟ';
      let select  = 'SELECT HERE';
      let header_sub = `LIST MENU`;
      let header = `┌───`;
      let middle = `│`;
      let pointer = `⭓`;
      let bottom = `└──────────⭓\n`
      let left = `『`;
      let right = `』`;
      let bigHeader = false;
      let type = db.settings.menu_type; //to change example type .setmenu 1 or .setmenu 2 or .setmenu 3 untuk ganti type menu ketik .setmenu 1 2 atau 3
      let top = { left, right, bigHeader, text, header_sub, select, type };
      let info = `${star} Simple WhatsApp Bot \nBy ${setting.footer}\n${garis}\n`;
      info += `Selamat ${waktu.suasana} Bangsat\n@${m.sender.split('@')[0]} 🐽\n`;
      info += `📝 Total Penggunaan Perintah‎\n ‎ ‎ ‎ ‎  ‎ Bot Kamu: ${db.users[m.sender].hitCmd} Kali ${garis}\n`;
      info += `👤 Owner : wa.me/${setting.contact}\n`;
      info += ` 📸 Instagram: ${sosmed}\n${garis}\n`;
      info += ` Network Bot Usage :\n📥 Download: ${Download}\n📤 Upload: ${Upload}\n${garis}\n`;
      info += `${lolim} = Limit \n${loprem} = Premium`;
      info += `${garis}`;      
      if (type === 1) {
        m.react('🐽');
        const all_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top);
        conn.adReply(m.chat, `${info}\n\n${all_menu}`, cover, m, {
           showAds: true
        });
      } else if (type === 2) {
         m.react('🖕');
         const sub_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top);
         conn.adReply(m.chat, `${info}\n\n${sub_menu}`, cover, m, {
            showAds: true
         });
      } else if (type === 3) {
         m.react('🥶');
         const { menu, message } = await Format.Menu(header, middle, pointer, bottom, prefix, top);
         if (!text) {
            conn.sendList(m.chat, info, message, m, {
               isMedia: true,
               media: {
                  image: {
                     url: cover
                  }
               }
            });
         } else if (text || text.toLowerCase() === 'all') {
            conn.adReply(m.chat, `${info}\n\n${menu}`, cover, m);
         }
      }
   }
}