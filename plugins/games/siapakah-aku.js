let siapakahaku = {}
let rewards = {
   limit: 20,
   uang: 40
}

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (siapakahaku.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.siapakahaku') && !budy.includes('.siapaaku')&& !m.isBaileys) {
         let jawaban = siapakahaku[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            await m.adReply(`Benar 🎊 \nkamu mendapatkan:\n+ ${rewards.limit} limit 🎟\n+ ${rewards.uang} uang 💵`, setting.thumbnail, m.chat)
            User.dbPlus(m.sender, rewards);
            delete siapakahaku[m.sender.split('@')[0]];
            console.log(siapakahaku);
         } else {
            m.reply('❎ Salah');
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['siapakahaku', 'siapaaku'],
   command: ['siapakahaku', 'siapaaku'],
   start: async (m, {
      conn,
      prefix,
      Format
   }) => {
      if (siapakahaku.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Terjawab!")
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json');
      let result = anu[Math.floor(Math.random() * anu.length)];
      m.adReply(`*Siapakah Aku*\nSilahkan Jawab Soal Di Bawah Ini\n\nDeskripsi :\n*${result.soal}*\n\nWaktu : 60 Detik\nHadiah : 🛍 \n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💵`, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehh3CYKBlK2WAla6ZV7nH8pD3-fdj9Q_cLw&usqp=CAU", m.chat).then(() => {
         siapakahaku[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
         console.log(siapakahaku);
      });
      await Format.sleep(60000);
      if (siapakahaku.hasOwnProperty(m.sender.split('@')[0])) {
         console.log("Jawaban: " + result.jawaban)
         m.adReply(`📢 Waktu Habis\nJawaban: ${siapakahaku[m.sender.split('@')[0]]}`, setting.thumbnail, m.chat)
         delete siapakahaku[m.sender.split('@')[0]]
      }
   }
};