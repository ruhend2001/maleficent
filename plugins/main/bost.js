exports.default = {
   names: ['Main Menu'],
   tags: ['bost', 'boost', 'percepat'],
   command: ['bost', 'boost', 'percepat'],
   start: async (m, {
      conn
   }) => {     
      conn.edReply(m.chat, global.ed, 'Sukses mempercepat bot', 500, m)
   }
}