module.exports = {
   start: async (m, {
      conn,
      budy,
      Format
   }) => {
      Format.chat_ai(m, { conn, budy, Format, isPrefix }).then((data) => {
         m.react('💬');
         conn.reply(m.chat, data, m)
      })
   }
}