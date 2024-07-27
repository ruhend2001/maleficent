let rewards = {
   limit: 10,
   uang: 30
}
exports.default = {
   names: ['Games'],
   tags: ['family100'],
   command: ['family100', 'family'],
   start: async (m, {
      conn,
      prefix,
      Format
   }) => {
      if ('family100' + m.chat in family100) return m.reply('Masih Ada Sesi Yang Belum Diselesaikan!'); // throw false
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
      let random = anu[Math.floor(Math.random() * anu.length)]
      let hasil = `*Jawablah Pertanyaan Berikut :*\n\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)\n` : ''}`.trim(); console.log(random.jawaban)
      family100['family100' + m.chat] = {
         id: 'family100' + m.chat,
         pesan: await conn.sendText(m.chat, hasil, m),
         ...random,
         terjawab: Array.from(random.jawaban, () => false)
      }
   }
};