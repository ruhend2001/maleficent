exports.default = {
   names: ['Setting Owner'],
   tags: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setmenu', 'setprefix', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink'],
   command: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setmenu', 'setprefix', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink'],
   start: async (m, {
      text,
      prefix,
      command,
      Format
   }) => {      
      if (command == 'set') {
         var caption = zw + ' *SETTING OWNER* \n*Perintah tersedia untuk mengatur setting bot berikut ini*\n\n'
         caption += '1 .setnamebot atau .setbotname \nUntuk mengganti nama bot \n\n'
         caption += '2 .setnameowner atau .setnameown \nUntuk mengganti nama owner \n\n'
         caption += '3 .setmenu\nUntuk Mengganti Gaya Menu \n\n'
         caption += '4 .setprefix\nUntuk Mengganti Type Penggunaan Prefix\n\n' 
         caption += '5 .setfooter atau .setwm \nUntuk mengganti watermark atau footer \n\n'
         caption += '6 .setsosmed \nUntuk mengganti link sosmed \n\n'
         caption += '7 .setmusic \nUntuk mengganti link music \n\n'
         caption += '8 .setram atau .ram \nUntuk mengganti nilai ram \n\n' 
         caption += '9 .setthumb atau .setthumbnail  atau .setcover atau .sthumb \nUntuk mengganti thumbnail utama bot \n\n'
         caption += '10 .setlink \nUntuk mengganti setting link group'
         return m.reply(caption);
      } else if (/setnamebot|setbotname/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Bot nya! \nContoh\n${prefix+command} Maleficent-bot`);         
         setting.botName = text
         save_setting();
         await m.reply(`Sukses mengganti nama bot menjadi ${text}\nRestarting...`);
         reset();    
      } else if (/setnameowner|setnameown/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Nya! \nContoh\n${prefix+command} Ruly Henderson`);
         setting.ownerName = text
         save_setting();
         await m.reply(`Sukses Mengganti Nama Owner Bot Menjadi ${text}\n`);         
      } else if (/setfooter|setwm/.test(command)) {
         if (!text) return m.reply(`Masukan nama footer atau watermark nya! \nContoh\n${prefix+command} © Ruhend`);
         setting.footer = text
         save_setting();
         await m.reply(`Sukses Mengganti Footer atau Watermark Bot Menjadi ${text}\nRestarting...`);
         reset()
      } else if (/setsosmed/.test(command)) {
         if (!text) return m.reply(`Masukan link sosmed nya! \nContoh\n${prefix+command} www.instagram.com/ru_hend_`);
         setting.sosmed = text
         save_setting();
         await m.reply(`Sukses Mengganti Link Sosmed Menjadi ${text}\n`);
      } else if (/setmusic/.test(command)) {
         if (!text) return m.reply(`Masukan link musicnya nya! \nContoh\n${prefix+command} https://MyMusic.mp3 \natau upload music menjadi url`);
         setting.music = text
         save_setting();
         await m.reply(`Sukses Mengganti Link Music Menjadi ${text}\n`);         
      } else if (/setram|ram/.test(command)) {
         /**
         nilai ram ini penting untuk mencegah terjadinya overload 
         jika panel atau vps kamu misalnya ram nya hanya 500MB atur ke 450 MB atau jika 1 GB kamu atur ke 950 MB dan seterusnya tergantung ram panel atau server kamu
         supaya ada space tersisa , jika overload agar tidak membebankan server vps atau panel kamu
         **/
         if (!text) return m.reply(`Masukan nilai ram nya! \nContoh\n${prefix+command} 800 MB`);
         setting.ram = text
         save_setting();
         await m.reply(`Sukses Mengganti Nilai RAM Menjadi ${text}\nRestarting...`);  
         reset()
      } else if (/setlink/.test(command)) {
         if (!text) return m.reply(`Masukan link group nya! \nContoh\n${prefix+command} ${global.link_group}\nAtau link lain juga bisa`);         
         const link = global.link_group
         save.global(`global.link_group = '${link}'`, `global.link_group = '${text}'`);
         await m.reply(`Sukses Mengganti Link Setting Menjadi ${text}`);
      } else if (/setmenu/.test(command)) {         
         if (!text) return m.reply(`masukan parameternya contoh \n${prefix+command} 1`);
         const available = ['1', '2', '3']
         if (available.includes(text)) {
            db.settings.menu_type = parseInt(text);
            m.reply(`Sukses Ganti Menu Type Ke ${text}`);
         } else {
            return m.reply(`Opsi Menu Type ${text} Tidak Tersedia`);
         }
      } else if (/setprefix/.test(command)) {         
         if (!text) return m.reply(`masukan parameternya contoh \n${prefix+command} multi`);         
         if (text === 'single') {
            db.settings.prefix = 'single'
            m.reply(`Sukses Ganti Prefix Type Ke single`);
         } else if (text === 'multi') {
            db.settings.prefix = 'multi'
            m.reply(`Sukses Ganti Prefix Type Ke multi`);     
         } else {
            return m.reply(`Opsi Prefix Type ${text} Tidak Tersedia\nYang Tersedia single dan multi`);
         }
      }
   },
   owner: true
};