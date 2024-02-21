import TicTacToe from './tictactoe-start.js'
let rewards = {
   limit: 15,
   uang: 30
}
export let m = {
   start: async (m, {
      conn,
      budy,
      User
   }) => {
      conn.game = conn.game ? conn.game : {}
      let room = Object.values(conn.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')      
     let parseMention = (text = '') => {
         return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
      }
       if (room) {
         let ok
         let isWin = !1
         let isTie = !1
         let isSurrender = !1
         if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return
         isSurrender = !/^[1-9]$/.test(m.text)
         if (m.sender !== room.game.currentTurn) { // nek wayahku
            if (!isSurrender) return !0
         }
         if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            m.reply({
               '-3': 'Game telah berakhir',
               '-2': 'Invalid',
               '-1': 'Posisi Invalid',
               0: 'Posisi Invalid',
            } [ok])
            return !0
         }
         if (m.sender === room.game.winner) isWin = true
         else if (room.game.board === 511) isTie = true
         let arr = room.game.render().map(v => {
            return {
               X: '❌',
               O: '⭕',
               1: '1️⃣',
               2: '2️⃣',
               3: '3️⃣',
               4: '4️⃣',
               5: '5️⃣',
               6: '6️⃣',
               7: '7️⃣',
               8: '8️⃣',
               9: '9️⃣',
            } [v]
         })
         if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX
            isWin = true
         }
         let winner = isSurrender ? room.game.currentTurn : room.game.winner
         let str = `Room ID: ${room.id}\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n${isWin ? `\n\n@${winner.split('@')[0]} Menang!\nGame berakhir\n@${winner.split('@')[0]} Mendapat Hadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰\nSilahkan Hapus Sesi ketik \n.delttt atau .delttc\n` : isTie ? `Game berakhir` : `Giliran ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}\n❌: @${room.game.playerX.split('@')[0]}\n⭕: @${room.game.playerO.split('@')[0]}\nKetik *nyerah* untuk menyerah dan mengakui kekalahan`
         if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
         if (room.x !== room.o) await conn.sendText(room.x, str, m, {
            mentions: parseMention(str)
         })
         await conn.sendText(room.o, str, m, {
            mentions: parseMention(str)
         })
         if (isTie || isWin) {
            if (isWin) {
               User.dbPlus(winner, rewards)
            }
            delete conn.game[room.id]
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tictactoe', 'ttt', 'ttc'],
   command: ['tictactoe', 'ttt', 'ttc', 'delttc', 'delttt'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (command == 'tictactoe' || command == 'ttt' || command == 'ttc') {         
         conn.game = conn.game ? conn.game : {}
         if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return m.reply('Kamu masih didalam game')
         let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
         let parseMention = (text = '') => {
         return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
      }
      if (room) {
            m.reply('Partner ditemukan!')
            room.o = m.chat
            room.game.playerO = m.sender
            room.state = 'PLAYING'
            let arr = room.game.render().map(v => {
               return {
                  X: '❌',
                  O: '⭕',
                  1: '1️⃣',
                  2: '2️⃣',
                  3: '3️⃣',
                  4: '4️⃣',
                  5: '5️⃣',
                  6: '6️⃣',
                  7: '7️⃣',
                  8: '8️⃣',
                  9: '9️⃣',
               } [v]
            })
            let str = `Room ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nMenunggu @${room.game.currentTurn.split('@')[0]}\nKetik *nyerah* untuk menyerah dan mengakui kekalahan`
            if (room.x !== room.o) await conn.sendText(room.x, str, m, {
               mentions: parseMention(str)
            })
            await conn.sendText(room.o, str, m, {
               mentions: parseMention(str)
            })
         } else {
            room = {
               id: 'tictactoe-' + (+new Date),
               x: m.chat,
               o: '',
               game: new TicTacToe(m.sender, 'o'),
               state: 'WAITING'
            }
            if (text) room.name = text
            m.reply(`\n\nMenunggu partner\natau kamu bisa ajak member lain dengan mengetik ${prefix+command}` + (text ? ` mengetik command dibawah ini ${prefix}${command} ${text}` : ''))
            conn.game[room.id] = room
         }
      } else if (command == 'delttc' || command == 'delttt') {         
         conn.game = conn.game ? conn.game : {}
         try {
            if (conn.game) {
               delete conn.game
               conn.sendText(m.chat, `Berhasil delete session TicTacToe`, m)
            } else if (!conn.game) {
               m.reply(`Session TicTacToe🎮 tidak ada`)
            } else throw '?'
         } catch (e) {
            m.reply('Broken')
         }
      }
   }
};