exports.default = {
   names: ['Group Menu'],
   tags: ['kickall', 'bubar'],
   command: ['kickall', 'bubar'],
   start: async (m, {
      conn,
      Format,
      participants
   }) => {
      return await Format.kickall(m, conn, participants), m.reply('Done');   
   },
   group: true,
   admin: true,
   botAdmin: true
}