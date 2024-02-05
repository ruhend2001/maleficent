let family100 = {}
let rewards = {
   limit: 10,
   uang: 30
}
export let m = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      if (('family100' + m.chat in family100) && budy && !budy.includes('.family100') && !budy.includes('.family') && !m.isBaileys) {
         let room = family100['family100' + m.chat]
         let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
         let isSurender = /^((me)?nyerah|surr?ender)$/i.test(budy)
         if (!isSurender) {
            let index = room.jawaban.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
            if (room.terjawab[index]) return !0
            room.terjawab[index] = m.sender
         }
         let parseMention = (text = '') => {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
         }
         let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
         let caption = `Jawablah Pertanyaan Berikut :\n\n*${room.soal}*\n\nTerdapat ${room.jawaban.length} Jawaban ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''} ${isWin ? `\n*Selamat 🎉 Semua Jawaban Terjawab*\n*Setiap Jawaban Benar Bernilai*\n*+ ${rewards.limit} limit* 🎟\n*+ ${rewards.uang} Uang* 💰\n` : isSurender ? 'Menyerah!' : ''}\n${Array.from(room.jawaban, (jawaban, index) => {
         return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
            }).filter(v => v).join('\n')}
         ${isSurender ? '' : ` `}`.trim()
         conn.sendText(m.chat, caption, m, {
            contextInfo: {
               mentionedJid: parseMention(caption)
            }
         }).then(mes => {
            return family100['family100' + m.chat].pesan = mesg
         }).catch(_ => _);
         let users = parseMention(caption)
         let givingAway = async () => {
            for (let i of users) {
               await new Promise(resolve => setTimeout(resolve, 2000));
               User.dbPlus(i, rewards);
            }
         }   
         if (isWin) {
            await givingAway();
            delete family100['family100' + m.chat];
         } else if (isSurender) {
            delete family100['family100' + m.chat];
         }
      }
   }
};

export default {
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
      let hasil = `*Jawablah Pertanyaan Berikut :*\n\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)\n` : ''}`.trim()
      family100['family100' + m.chat] = {
         id: 'family100' + m.chat,
         pesan: await conn.sendText(m.chat, hasil, m),
         ...random,
         terjawab: Array.from(random.jawaban, () => false)
      }
   }
};