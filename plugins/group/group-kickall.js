exports.default = {
   names: ['Group Menu'],
   tags: ['kickall', 'ttes'],
   command: ['kickall', 'ttes'],
   start: async (m, {
      conn,
      Format,
      isAdmins,
      participants
   }) => {
      const member = participants.map(a => a.id);
      const isBot = conn.decodeJid(conn.user.id);
      for await (let i of member) {
         if (i !== isBot) {
            await Format.sleep(2500);
            await conn.groupParticipantsUpdate(m.chat, [i], 'remove');
         }
      }
   },
   group: true,
   admin: true,
   botAdmin: true
};