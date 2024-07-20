let susunkata = {}
let rewards = {
   limit: 15,
   uang: 30
}
let miss = Math.floor(Math.random() * 3);
let wrong = ['❎ Salah', '🤯 Kurang Tepat', '🥵 Belum Benar'][miss];

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (susunkata.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.susunkata') && !m.isBaileys) {
         let jawaban = susunkata[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            await m.adReply(`Benar 🎊 \nkamu mendapatkan:\n+ ${rewards.limit} limit 🎟\n+ ${rewards.uang} uang 💵`, setting.thumbnail, m.chat)
            User.dbPlus(m.sender, rewards);
            delete susunkata[m.sender.split('@')[0]];
            console.log(susunkata);
         } else {
            await m.adReply(wrong, setting.thumbnail, m.chat);
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['susunkata'],
   command: ['susunkata'],
   start: async (m, {
      conn,
      prefix,
      Format
   }) => {
      if (susunkata.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Terjawab!")
      let results = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
      let result = results[Math.floor(Math.random() * results.length)];
      m.adReply(`Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.soal}\n\nTipe ${result.tipe}\nWaktu : 60 Detik\nHadiah 🛍\n${rewards.limit} limit 🎟 dan ${rewards.uang} uang 💵`, "https://lh3.googleusercontent.com/o2SA5NGKG3hTljpBZMnAPG2T7qdhhCk6gvY1tnn1fIm9JvTqnrkIiCL6_FOptI9WpA", m.chat).then(() => {
         susunkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
         console.log(susunkata);
      });
      await Format.sleep(60000);
      if (susunkata.hasOwnProperty(m.sender.split('@')[0])) {
         console.log("Jawaban: " + result.jawaban)
         m.adReply(`📢 Waktu Habis\nJawaban: ${susunkata[m.sender.split('@')[0]]}`, setting.thumbnail, m.chat)
         delete susunkata[m.sender.split('@')[0]]
         console.log(susunkata);
      }
   }
};
