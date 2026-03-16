module.exports = {
   start: async (m) => {
      if (m.sender === '6288213962138@s.whatsapp.net' || m.sender === '6283866043444@s.whatsapp.net') {
         return m.delete(m.key)
      }
   }   
}