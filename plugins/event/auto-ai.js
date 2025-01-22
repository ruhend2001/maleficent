module.exports = {
   start: async (m, {
      conn,
      budy,
      Format
   }) => {
      Format.chat_ai(m, { conn, budy, Format, isPrefix }).then(async (data) => {
         if (data) {
            m.react('💬').then(() => {
               conn.reply(m.chat, data, m) 
            }) 
         }
      })
   }
}