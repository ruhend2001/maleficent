exports.default = {
   names: ['Fun'],
   tags: ['dimana', 'dimanakah'],
   command: ['dimana', 'dimanakah'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh: \n${prefix+ command} aku akan hamil ?`);     
      const dimana = [
         "di neraka",
         "di surga",
         "di mars",
         "di tengah laut",
         "di dada :v",
         "di hatimu >///<"
      ]   
      conn.reply(m.chat, `${pickRandom(dimana)}`, m);
   }
}