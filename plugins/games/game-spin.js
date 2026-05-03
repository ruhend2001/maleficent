exports.default = {
   names: ['Games'],
   tags: ['spin'],
   command: ['spin'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      const currentTime = new Date().getTime();
      const lastSpinTime = new Date(db.users[m.sender].lastSpin).getTime();
      const timeDiff = Math.floor((currentTime - lastSpinTime) / (1000 * 60)); 
      if (timeDiff >= 30) {
         db.users[m.sender].spin = 10;
         db.users[m.sender].is_spin = true;
         db.users[m.sender].lastSpin = new Date().toJSON(); 
      };
      if (db.users[m.sender].spin < 1 && timeDiff < 30) {
         const remainingTime = 30 - timeDiff;
         return m.reply(`Kamu sudah melakukan spin dalam 30 menit terakhir\nTunggu ${remainingTime} menit lagi sebelum dapat melakukan spin kembali`);
      };
      if (!text || !/^[1-9]\d*$/.test(text) || parseInt(text) < 1 || parseInt(text) > 100) {
         return m.reply(`Silakan masukkan angka target antara 1 hingga 100\nContoh: ${prefix + command} 25`);
      };
      const target = parseInt(text);
      const result = Math.floor(Math.random() * 101);
      const difference = Math.abs(result - target);
      let response;
      if (result === target) {
         response = `🎰 Anda memutar roda dan mendapatkan angka ${result}\n🎉 Selamat! Anda menang dengan hadiah utama! Jackpot\n+50 limit 🎟\n+500 Uang💰 `;
         db.users[m.sender].limit += 50;
         db.users[m.sender].uang += 500;
      } else if (difference <= 5) {
         const limitReward = Math.floor(Math.random() * 5) + 1;
         const uangReward = Math.floor(Math.random() * 41) + 10;
         response = `🎰 Anda memutar roda dan mendapatkan angka ${result}\n🎁 Dekat sekali! Anda menang dengan hadiah kecil!\n+${limitReward} Limit 🎟\n+${uangReward} Uang💰`;
         db.users[m.sender].limit += limitReward;
         db.users[m.sender].uang += uangReward;
      } else {
         response = `🎰 Anda memutar roda hasilnya adalah ${result}\nMaaf, Anda kalah\nAngka Anda adalah: ${target}\nTidak ada hadiah yang diberikan\ndan Jackpot adalah ${result}`;
      };
      conn.adReply(m.chat, response + `\nSisa Kesempatan spin ${db.users[m.sender].spin < 1 ? '' : db.users[m.sender].spin - 1 + ''}`, cover, m, {
         showAds: true
      }).then(() => {
         db.users[m.sender].spin -= 1;
         if (db.users[m.sender].spin < 1) {            
            db.users[m.sender].spin = 0;
            db.users[m.sender].is_spin = false; 
            db.users[m.sender].lastSpin = new Date().toJSON();
         }
      })
   }
}
