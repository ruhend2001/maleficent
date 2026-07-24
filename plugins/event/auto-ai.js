module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      try {
         if (((!m.isGroup && db.users[m.sender].chat_ai) || (m.isGroup && db.chats[m.chat].chat_ai)) && budy && !m.isBaileys) {
            const evaluate = ['module', 'exports', '>', '=', '-', '~', '$', ...isPrefix];
            const rejected = evaluate.some(v => budy.startsWith(v));
            if (!rejected) {
               const data = await toJSON(`https://api.azbry.com/api/ai/aiko?q=${budy}`);
               return await conn.reply(m.chat, data.response.replace(/(Saya Aiko!|"Aiko"|Aiko|[*])/g, '').trim(), m);
            }
         }
      } catch {
         return console.log('Something is wrong with auto ai')
      }
   }
}