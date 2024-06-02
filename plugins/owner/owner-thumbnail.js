export default {
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
         let { url } = await Format.upload(image);
         User.changeThumb({ 
            thumbnail: url 
         });
         console.log(url);
         m.reply(`Sukses Mengganti Thumbnail Bot\n\nRestarting....`);
         await Format.sleep(2000);
         process.send('reset');
      } else {
         return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   owner: true
};