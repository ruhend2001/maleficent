exports.default = {
   names: ['Owner'],
   tags: ['self', 'public'],
   command: ['self', 'public'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User
   }) => {
      if (command == 'public') {
         setting.self = false
         save_setting()
         await m.reply(`Mode self berhasil dimatikan. Sekarang semua orang dapat mengakses bot ini \nmemulai ulang bot...`);
         setTimeout(() => {
            process.send('reset');
         }, 1000);
      } else if (command == 'self') {
         setting.self = true
         save_setting()
         await m.reply(`Mode self berhasil diaktifkan. Hanya aku, owner, dan premium yang dapat mengakses bot ini \nmemulai ulang bot...`);
         setTimeout(() => {
            process.send('reset');
         }, 1000);
      }
   },
   owner: true
};
