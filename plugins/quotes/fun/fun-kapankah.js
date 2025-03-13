exports.default = {
   names: ['Fun'],
   tags: ['kapan', 'kapankah'],
   command: ['kapan', 'kapankah'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh: \n${prefix+ command} aku mati?`);      
      const kapan = [
         "detik",
         "menit",
         "jam",
         "hari",
         "minggu",
         "bulan",
         "tahun",
         "dekade",
         "abad"
      ]
      conn.reply(m.chat, `${Math.floor(Math.random() * 10) + 1} ${pickRandom(kapan)} lagi`, m);
   }
}