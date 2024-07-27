const reboot = () => process.send('reset');
exports.default = {
   names: ['Owner'],
   tags: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink', 'setlinkgc', 'setgroupmode', 'setgcmode', 'setrespononlygroup', 'setrespononlygc'],
   command: ['set', 'setnamebot', 'setbotname', 'setnameowner', 'setnameown', 'setfooter', 'setwm', 'setsosmed', 'setmusic', 'setram', 'ram', 'setlink', 'setlinkgc', 'setgroupmode', 'setgcmode', 'setrespononlygroup', 'setrespononlygc'],
   start: async (m, {
      text,
      prefix,
      command,
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
         caption += `.setgroupmode atau .setgcmode\nUntuk mengganti akses bot ke mode group atau keduanya private and group\n\n`
         caption += `.setrespononlygroup atau .setrespononlygc\nUntuk mematikan dan mengaktifkan respon message groupOnly`
         return m.reply(caption);
      } else if (/setnamebot|setbotname/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Bot nya! \nContoh\n${prefix+command} Maleficent-bot`);         
         setting.botName = text
         save_setting();
         await m.reply(`Sukses mengganti nama bot menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setnameowner|setnameown/.test(command)) {
         if (!text) return m.reply(`Masukan Nama Nya! \nContoh\n${prefix+command} Ruly Henderson`);
         setting.ownerName = text
         save_setting();
         await m.reply(`Sukses Mengganti Nama Owner Bot Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setfooter|setwm/.test(command)) {
         if (!text) return m.reply(`Masukan nama footer atau watermark nya! \nContoh\n${prefix+command} © Ruhend`);
         setting.footer = text
         save_setting();
         await m.reply(`Sukses Mengganti Footer atau Watermark Bot Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setsosmed/.test(command)) {
         if (!text) return m.reply(`Masukan link sosmed nya! \nContoh\n${prefix+command} www.instagram.com/ru_hend_`);
         setting.sosmed = text
         save_setting();
         await m.reply(`Sukses Mengganti Link Sosmed Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setmusic/.test(command)) {
         if (!text) return m.reply(`Masukan link musicnya nya! \nContoh\n${prefix+command} https://MyMusic.mp3 \natau upload music menjadi url`);
         setting.music = text
         save_setting();
         await m.reply(`Sukses Mengganti Link Music Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setram|ram/.test(command)) {
         /**
         nilai ram ini penting untuk mencegah terjadinya overload 
         jika panel atau vps kamu misalnya ram nya hanya 500MB atur ke 450 atau jika 1 GB kamu atur ke 850 dan seterusnya tergantung ram panel atau server kamu
         supaya ada space tersisa , jika overload agar tidak membebankan server vps atau panel kamu
         **/
         if (!text) return m.reply(`Masukan nilai ram nya! \nContoh\n${prefix+command} 800`);
         setting.ram = parseInt(text);
         save_setting();
         await m.reply(`Sukses Mengganti Nilai RAM Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setlink|setlinkgc/.test(command)) {
         if (!text) return m.reply(`Masukan link group nya! \nContoh\n${prefix+command} ${setting.group.link}\nAtau link lain juga bisa`);
         setting.group.link = text
         save_setting();
         await m.reply(`Sukses Mengganti Link Setting Menjadi ${text}\n\nRestarting....`);
         await Format.sleep(1000);
         reboot();
      } else if (/setgroupmode|setgcmode/.test(command)) {         
         if (!text) return m.reply(`masukan parameternya contoh \n${prefix+command} on atau off`);
         if (text.toLowerCase() == 'on') {
            setting.group.only = true
            save_setting();
            await m.reply(`Sukses Mengubah Ke Group Mode \nPrivate Chat Tidak Bisa Di Akses Kecuali Aku , Owner Dan Premium\n\nRestarting....`);
            await Format.sleep(1000);
            reboot();
         } else if (text.toLowerCase() == 'off') {
            setting.group.only = false
            save_setting();
            await m.reply(`Sukses Mematikan Group Mode Sekarang Private Chat Dapat Diakses\n\nRestarting....`);
            await Format.sleep(1000);
            reboot();
         } else {
            return m.reply(`Masukan parameter yang valid on/off \nContoh\n${prefix+command} on\nAtau\n${prefix+command} off`);                
         } 
      } else if (/setrespononlygroup|setrespononlygc/.test(command)) {         
         if (!text) return m.reply(`masukan parameternya contoh \n${prefix+command} on atau off`);
         if (text.toLowerCase() == 'on') {
            setting.group.only_message = true
            save_setting();
            await m.reply(`Sukses Mengaktifkan Respon ${mess.groupOnly} Pada Chat Pribadi\nJika Mode Group Aktif Dan Jika Ada Pesan Datang Di Pribadi Chat, Kecuali Aku, Owner, Dan Premium Maka Akan Merespon ${mess.groupOnly}\n\nRestarting....`);
            await Format.sleep(1000);
            reboot();
         } else if (text.toLowerCase() == 'off') {
            setting.group.only_message = false
            save_setting();
            await m.reply(`Sukses Mematikan Respon Pesan ${mess.groupOnly} Pada Chat Pribadi\nJika Mode Group Aktif Dan Jika Ada Pesan Datang Di Pribadi Chat, Kecuali Aku, Owner, Dan Premium Maka Sama Sekali Tidak Akan Merespon Apapun\n\nRestarting....`);
            await Format.sleep(1000);
            reboot();
         } else {
            return m.reply(`Masukan parameter yang valid on/off \nContoh\n${prefix+command} on\nAtau\n${prefix+command} off`);                
         }
      }
   },
   owner: true
};
