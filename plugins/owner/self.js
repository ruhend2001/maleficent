exports.default = {
   names: ['Owner'],
   tags: ['self', 'public'],
   command: ['self', 'public'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (command == 'public') {
         save.global('global.self = true', 'global.self = false');
         await m.reply(`Mode self berhasil dimatikan. Sekarang semua orang dapat mengakses bot ini\nRestarting...`);
         reset()       
      } else if (command == 'self') {
         save.global('global.self = false', 'global.self = true');
         await m.reply(`Mode self berhasil diaktifkan. Hanya aku, owner, dan premium yang dapat mengakses bot ini\nRestarting...`);   
         reset()      
      }
   },
   owner: true
};
