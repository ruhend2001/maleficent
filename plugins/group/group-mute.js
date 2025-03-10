exports.default = {
   names: ['Group Menu'],
   tags: ['mute', 'unmute'],
   command: ['mute', 'unmute'],
   start: async (m, {
      command
   }) => {
      if (command == 'mute') {
         db.chats[m.chat].mute = true
         return await m.reply('Berhasil mute di chat ini');
      } else if (command == 'unmute') {
         db.chats[m.chat].mute = false
         return await m.reply('Berhasil unmute di chat ini');
      }
   },
   admin: true,
   group: true
};