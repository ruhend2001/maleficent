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
      const garis = '' //*────────────*'
      const side = '' //'*┆*'
      const top = '' //'┏⭓'
      const bot = '' //'*└*⭓'
      const title = `${setting.botName}\n${setting.footer}`;
      const music = 'https://files.catbox.moe/budm4e.mp3';
      const lolim = logo_limit || 'Ⓛ';
      const loprem = logo_premium || 'Ⓟ';
      const select = 'SELECT HERE';
      const header_sub = `LIST MENU`;
      const header = `┌────`;
      const middle = `│`;
      const pointer = `⭓`;
      const bottom = `└──────────⭓\n`
      const left = `『`;
      const right = `』`;
      const bigHeader = false;
      const type = db.settings.menu_type; //to change example type .setmenu 1 or .setmenu 2 or .setmenu 3 untuk ganti type menu ketik .setmenu 1 2 atau 3
      const top_1 = { left, right, bigHeader, text, header_sub, select, type, command, conn };
      const { Upload, Download } = await Format.statistic();
      const audio = () => conn.sendFile(m.chat, music, '', m, { fileLength: 10240 });
      let info = `${top}${garis}${side} ${star} Menu ${setting.botName}\n${side} Simple WhatsApp Bot \n${side} By ${setting.footer}\n${side}${garis}\n`;
      info += `${side} 👋 Selamat ${waktu.suasana.charAt(0).toUpperCase() + waktu.suasana.slice(1)} Bangsat\n${side} @${m.sender.split('@')[0]} 🐽\n`;
      info += `${side} Total Penggunaan Perintah‎\n${side} Bot Kamu: ${db.users[m.sender].hitCmd} Kali\n${side}${garis}\n`;
      info += `${side} Owner: +${setting.contact}\n\n`;      
      info += `${side} Network Bot Usage :\n${side} 📥 Download: ${Download}\n${side} 📤 Upload: ${Upload}\n${side}${garis}\n`;
      info += `${side} ${lolim} = Limit \n${side} ${loprem} = Premium\n${bot}${garis}`       
      if (type === 1) {
         m.react('🐽');
         const all_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top_1);
         conn.adReply(m.chat, `${info}\n${all_menu}`, cover, m), audio();
      } else if (type === 2) {
         m.react('🖕');
         const sub_menu = await Format.Menu(header, middle, pointer, bottom, prefix, top_1);
         conn.adReply(m.chat, `${info}\n${sub_menu}`, cover, m), audio();         
      } else if (type === 3) {
         m.react('🥶');
         const opts = [{
            title: 'Owner',
            id: '.owner'
         }, {
            title: 'Sewa',            
            id: '.sewa'
         }, {
            title: 'Source Code',
            id: '.sc'
         }]
         const { menu, message } = await Format.Menu(header, middle, pointer, bottom, prefix, top_1, opts);
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
            //conn.adReply(m.chat, `${info}\n${menu}`, cover, m);
            conn.sendList(m.chat, `${info}\n${menu}`, message, m, {
               isMedia: true,
               media: {
                  image: {
                     url: cover
                  }
               }
            })
         }
      }
   }
}