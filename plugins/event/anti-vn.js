module.exports = {
   start: async (m, {
      conn
   }) => {   
      if (!m.fromMe && m.isBaileys && m.msg.ptt) return m.delete(m.key)
   }
}