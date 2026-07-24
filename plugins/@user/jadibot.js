exports.default = {
   names: ['User'],
   tags: ['jadibot', 'stopjadibot', 'listjadibot', 'deletejadibot'],
   command: ['jadibot', 'stopjadibot', 'listjadibot', 'deletejadibot', 'deljadibot'],
   start: async (m, {
      conn,
      text,
      isOwner,
      command
   }) => {
      if (!global.jadibot_engine) return m.reply('Fitur jadibot belum di nyalakan owner');
      if (/stopjadibot/g.test(command)) {
         return await Stopjadibot(m)
      } else if (/listjadibot/g.test(command)) {
         return await Listjadibot(m)
      } else if (/deljadibot|deletejadibot/g.test(command)) {
         if (!isOwner) return m.reply(mess.OnlyOwner)
         return await Deletejadibot(m, text)
      } else if (/jadibot/g.test(command)) {
         return await Jadibot(m)
      } 
   }
}