exports.default = {
   names: ['Owner'],
   tags: ['setthumbnail', 'setthumb', 'sthumb'],
   command: ['setthumbnail', 'setthumb', 'sthumb'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      User,
      Format
   }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         let image = await conn.downloadAndSaveMediaMessage(quoted);
         m.reply(`Process...`);
         let link = await Format.upload2(image);
         setting.thumbnail = link
         save_setting()
         await m.reply(`Sukses Mengganti Thumbnail Bot\n\nRestarting....`);
         setTimeout(() => {
            process.send('reset');
         }, 1000);
      } else {
         return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   owner: true
};
