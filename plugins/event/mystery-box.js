module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (word(budy, 'open') && gift[m.chat] && m.isGroup && !m.isBaileys) {
         if (gift[m.chat]) gift[m.chat].lastActive = Date.now();
         await m.reply('Tunggu Sedang Membuka Kotak');
         const caption = `🎁 *Selamat @${m.sender.split('@')[0]} Kamu Mendapatkan* 🎉\n` +
         `*+${gift[m.chat].hadiah.limit} Limit* 🎟\n` +
         `*+${gift[m.chat].hadiah.uang} Uang* 💰\n` +
         `*Mystery Box Akan Ada Lagi Selanjutnya* ♻`;
         conn.reply(m.chat, caption, gift[m.chat].msg, {
            contextInfo: {
               mentionedJid: [m.sender]
            }
         });        
         db.users[m.sender].limit += parseInt(gift[m.chat].hadiah.limit);
         db.users[m.sender].uang += parseInt(gift[m.chat].hadiah.uang);
         await Format.sleep(1000);
         await m.delete(gift[m.chat].msg.key);
         delete gift[m.chat];
      } else if (word(budy, 'open') && !gift[m.chat] && m.isGroup && !m.isBaileys) {
         return m.reply('Ups Kotak Mystery Mungkin Sudah Kadaluwarsa, Tunggu Selanjutnya!');
      }
   }
}