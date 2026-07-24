let rewards = {
   limit: 20,
   uang: 40
}
let failed = {
   uang: 3
}
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      let exp = 0;
      let id = m.chat;
      let timeout = 120000;      
      let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(budy);
      if (isSurrender && boom && (id in boom) && budy && !m.isBaileys) {
         await m.reply(`Yah Menyerah 🐷`);
         clearTimeout(boom[id][2]);
         delete boom[id];
      }
      if (boom[id] && budy && !m.isBaileys) {
         let json = boom[id][1].find(v => v.position == budy);
         let player = boom[id][1].find(v => v.player == m.sender);
         if (!player) return// m.reply(`🐷 Bukan sesi permainanmu.`);
         if (!json && !m.isBaileys) return;// conn.reply(m.chat, `*Untuk membuka kotak kirim angka 1 - 9*`, boom[id][0]);
         if (!m.isBaileys && budy === false || budy < 1 || budy > 9) {
            return m.reply(`🙉 Masukkan angka antara 1 - 9.`);
         }
         if (json.emot == '💥') {
            json.state = true;
            let bomb = boom[id][1];
            let teks = `💣 *B O M B*\n@${m.sender.split('@')[0]}\n\n`;
            teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
            teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
            teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
            teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;
            teks += `*Permainan selesai!*\nkotak berisi bom terbuka 🐽\n❌ Uang Kamu Berkurang - ${failed.uang}💲\nMain Lagi .boom`;
            conn.sendMessage(m.chat, {
               text: teks,
               mentions: [m.sender]
            }, {
               quoted: boom[id][0],
               ...conn.exp
            }).then(() => {
               delete boom[id];              
               db.users[m.sender].uang -= failed.uang;
               clearTimeout(boom[id]);
            })
         } else if (json.state) {
            return conn.reply(m.chat, `💣 Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`, boom[id][0]);
         } else {
            json.state = true;
            let changes = boom[id][1];
            let open = changes.filter(v => v.state && v.emot != '💥').length;
            console.log(changes);
            if (open >= 8) {
               let teks = `💣  *B O M B*\n@${m.sender.split('@')[0]}\n\n`;
             //  teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
               teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
               teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
               teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
               teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;
               teks += `*Permainan selesai!* kotak berisi bom tidak terbuka `;
               let _a = `${teks}\n\nHadiah 🎉:\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`
               conn.sendMessage(m.chat, {
                  text: _a,
                  mentions: [m.sender]
               }, {
                  quoted: boom[id][0],
                  ...conn.exp
               }).then(() => {
                  db.users[m.sender].uang += rewards.uang
                  db.users[m.sender].limit += rewards.limit                  
                  clearTimeout(boom[id][2]);
                  delete boom[id];
               });
            } else {
               let teks = `💣  *B O M B*\n@${m.sender.split('@')[0]}\n`;
               teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
               teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
               teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n';
               teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n';
               teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;               
               conn.sendMessage(m.chat, {
                  text: teks,
                  mentions: [m.sender]
               }, {
                  quoted : m,
                  ...conn.exp
               })
            }
         }
      }
      return !0;
   }
};
