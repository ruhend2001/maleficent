exports.default = {
   names: ['Fun'],
   tags: ['kerang', 'kerangajaib'],
   command: ['kerang', 'kerangajaib'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh: \n${prefix+ command} apakah aku binatang?`);
      const kerang = [
         "Mungkin suatu hari",
         "Tidak juga",
         "Tidak keduanya",
         "Kurasa tidak",
         "Ya",
         "Tidak Mungkin",
         "Coba tanya lagi",
         "Tidak ada"
      ]
      const caption = pickRandom(kerang);
      conn.reply(m.chat, caption, m);
   }
}