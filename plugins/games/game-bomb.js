exports.default = {
   names: ['Games'],
   tags: ['boom', 'bomb'],
   command: ['boom', 'bomb'],
   start: async (m, {
      conn,
      prefix,
      Format
   }) => {
      const boom = db.games.boom, id = m.chat
      if (id in boom) return conn.reply(m.chat, "*☝sesi ini belum selesai !*", boom[id][0]);
      const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
      const number = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
      const array = bom.map((x, i) => ({
         'emot': x,
         'number': number[i],
         'position': i + 1,
         'state': false,
         'player': m.sender
      }));
      let teks = "💣 *B O M B*\n\nKirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n";
      for (let i = 0; i < array.length; i += 3) {
         teks += array.slice(i, i + 3).map(v => v.state ? v.emot : v.number).join('') + "\n";
      }
      teks += "\nTimeout : [ *2 menit* ]\nApabila mendapat kotak yang berisi bom maka uang akan di kurangi.";
      let msg = await m.reply(teks);
      let user = msg.message.extendedTextMessage.contextInfo.participant;
      let { key } = msg;
      let v;
      boom[id] = [msg, array, setTimeout(() => {
         v = array.find(i => i.emot == '💥');
         if (boom[id]) conn.reply(m.chat, "*Waktu habis!*\nBom berada di kotak nomor " + v.number + "\nmain lagi .boom", msg, {
            contextInfo: {
               mentionedJid: [user]
            }
         });
         delete boom[id];
      }, 120_000), key];
   }
};