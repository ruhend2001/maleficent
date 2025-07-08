exports.default = {
   names: ['Owner'],
   tags: ['setthumbnail', 'setthumb', 'sthumb', 'setcover'],
   command: ['setthumbnail', 'setthumb', 'sthumb', 'setcover'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         const image = await conn.downloadAndSaveMediaMessage(quoted);
         m.reply('Process...');
         const link = await Format.upload2(image);
         db.settings.cover = link, setting.thumbnail = link, save_setting();
         return m.reply(`Sukses Mengganti Thumbnail Bot`);         
      } else if (text.startsWith('https')) {
         m.reply('Process...');
         db.settings.cover = text, setting.thumbnail = text, save_setting();
         return m.reply(`Sukses Mengganti Thumbnail Bot`);   
      } else {
         return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}\n\nAtau\n\nMasukan link gambar nya contoh ${prefix+command} https://myimage.jpg`)
      }
   },
   owner: true
}