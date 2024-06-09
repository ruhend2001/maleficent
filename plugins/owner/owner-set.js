var boot = () => process.send('reset');
export default {
   names: ['Owner'],
   tags: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink', 'setlinkgc', 'setgroupmode', 'setgcmode'],
   command: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink', 'setlinkgc', 'setgroupmode', 'setgcmode'],
   start: async (m, {
      text,
      prefix,
      command,
      User,
      Format
   }) => {      
      if (command == 'set') {
         var caption = `*SETTING OWNER* \n*Perintah tersedia untuk mengatur setting hanya ada berikut ini*\n\n\n`
         caption += `.setnamebot atau .setbotname \nUntuk mengganti nama bot \n\n`
         caption += `.setnameowner atau .setnameown \nUntuk mengganti nama owner \n\n`
         caption += `.setfooter atau .setwm \nUntuk mengganti watermark atau footer \n\n`
         caption += `.setsosmed \nUntuk mengganti link sosmed \n\n`
         caption += `.setmusic \nUntuk mengganti link music \n\n`
         caption += `.setram atau .ram \nUntuk mengganti nilai ram \n\n` 
         caption += `.setthumb atau setthumbnail atau .sthumb \nUntuk mengganti thumbnail utama bot \n\n`
         caption += `.setlink atau setlinkgc \nUntuk mengganti setting link group\n\n`
         caption += `.setgroupmode atau .setgcmode\nUntuk mengganti akses bot ke mode group atau keduanya private and group`
         return m.reply(caption);
      } else if (/setnamebot|setbotname/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Bot nya! \nContoh\n${prefix+command} Maleficent-bot`);
         User.changeBotName({ 
            botName: text
         });
         m.reply(`Sukses mengganti nama bot menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setnameowner|setnameown/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Nya! \nContoh\n${prefix+command} Ruly Henderson`);
         User.changeOwnerName({ 
            ownerName: text
         });
         m.reply(`Sukses Mengganti Nama Owner Bot Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setfooter|setwm/.test(command)) {
         if (!text) return m.reply(`Masukan nama footer atau watermark nya! \nContoh\n${prefix+command} © Ruhend`);
         User.changeFooter({ 
            footer: text
         });
         m.reply(`Sukses Mengganti Footer atau Watermark Bot Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setsosmed/.test(command)) {
         if (!text) return m.reply(`Masukan link sosmed nya! \nContoh\n${prefix+command} www.instagram.com/ru_hend_`);
         User.changeSosmed({ 
            sosmed: text
         });
         m.reply(`Sukses Mengganti Link Sosmed Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setmusic/.test(command)) {
         if (!text) return m.reply(`Masukan link musicnya nya! \nContoh\n${prefix+command} https://MyMusic.mp3 \natau upload music menjadi url`);
         User.changeMusic({ 
            music: text
         });
         m.reply(`Sukses Mengganti Link Music Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setram|ram/.test(command)) {
         /**
         nilai ram ini penting untuk mencegah terjadinya overload 
         jika panel atau vps kamu misalnya ram nya hanya 500MB atur ke 450 atau jika 1 GB kamu atur ke 850 dan seterusnya tergantung ram panel atau server kamu
         supaya ada space tersisa , jika overload agar tidak membebankan server vps atau panel kamu
         **/
         if (!text) return m.reply(`Masukan nilai ram nya! \nContoh\n${prefix+command} 800`);
         User.changeRam({ 
            ram: text
         });
         m.reply(`Sukses Mengganti Nilai RAM Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setlink|setlinkgc/.test(command)) {
         if (!text) return m.reply(`Masukan link group nya! \nContoh\n${prefix+command} ${setting.group.link}\nAtau link lain juga bisa`);
         User.changeGroupLink(text);
         m.reply(`Sukses Mengganti Link Setting Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(2000);
         boot();
      } else if (/setgroupmode|setgcmode/.test(command)) {         
         if (!text) return m.reply(`masukan parameternya contoh \n${prefix+command} on atau off`);
         let active = true
         let deactive = false
         if (text.toLowerCase() == 'on') {
            User.changeGroupMode(active);
            m.reply(`Sukses Mengubah Ke Group Mode \nPrivate Chat Tidak Bisa Di Akses Kecuali Aku , Owner Dan Premium\n\nRestarting....`);
            await Format.sleep(2000);
            boot();
         } else if (text.toLowerCase() == 'off') {
            User.changeGroupMode(deactive);
            m.reply(`Sukses Mematikan Group Mode Sekarang Private Chat Dapat Diakses\n\nRestarting....`);
            await Format.sleep(2000);
            boot();
         } else {
            return m.reply(`Masukan parameter yang valid on/off \nContoh\n${prefix+command} on\nAtau\n${prefix+command} off`);                
         } 
      }      
   },
   owner: true
};
