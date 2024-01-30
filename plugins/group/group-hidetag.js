export default {
   names: ['Group Menu'],
   tags: ['hidetag'],
   command: ['ht', 'hidetag'],
   start: async (m, {
      conn,
      text,
      participants
   }) => {
      let mem = [];
      participants.map(i => mem.push(i.id))
      conn.sendMessage(m.chat, {
         text: text ? text : '',
         mentions: mem
      }, {
         quoted: m
      });
   },
   group: true,
   admin: true,
   owner: true
};