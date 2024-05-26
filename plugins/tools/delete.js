export default {
   names: ['Tools'],
   tags: ['delete', 'del'],
   command: ['delete', 'del'],
   start: async (m, {
      conn,
   }) => {
      conn.removeMessage(m);
   },
   premium: true
};