module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      try {
         if (((!m.isGroup && db.users[m.sender].chat_ai) || (m.isGroup && db.chats[m.chat].chat_ai)) && budy && !m.isBaileys) {
            const evaluate = ['module', 'exports', '>', '=', '-', '~', '$', ...isPrefix, ...cmd_plugins];
            const rejected = evaluate.some(v => budy.startsWith(v));
            if (!rejected) {
               if (/^[0-9]/.test(budy)) return false
               const data = await JSON_URL(`https://www.velyn.biz.id/api/ai/openai?prompt=${budy}`);
               return await m.react('〰').then(() => conn.reply(m.chat, data.data.replace(/\*/g, ''), m));
            } else {
               return false
            }
         }
      } catch {
         return console.log('Something is wrong with auto ai')
      }
   }
}