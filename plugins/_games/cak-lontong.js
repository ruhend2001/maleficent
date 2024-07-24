let rewards = {
   limit: 15,
   uang: 25
}
exports.default = {
   names: ['Games'],
   tags: ['caklontong'],
   command: ['caklontong', 'cak'],
   start: async (m, {
      conn,
      Format
   }) => {
      if (caklontong.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!");
      console.log(caklontong);
      console.log(caklontong_desk);
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      conn.adReply(m.chat, `Jawablah Pertanyaan Berikut :\n\n\n*${result.soal}*\n\n\nWaktu : 60 detik\n🎁 Hadiah\n+${rewards.limit} Limit 🎟\n+${rewards.uang} Uang 💰`, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhjq_8cvfICed0NWLYemchaBqC9QN8RjbGg&usqp=CAU', m).then(() => {
         caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase();console.log(caklontong);
         caklontong_desk[m.sender.split('@')[0]] = result.deskripsi;
         console.log(caklontong_desk);                  
      }) 
      await Format.sleep(60000);     
      if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {      
         conn.adReply(m.chat, `Waktu Habis\nJawaban: ${caklontong[m.sender.split('@')[0]]}\nDeskripsi : ${caklontong_desk[m.sender.split('@')[0]]}`, cover, m);         
         delete caklontong[m.sender.split('@')[0]]
         delete caklontong_desk[m.sender.split('@')[0]]            
      }
   }
}