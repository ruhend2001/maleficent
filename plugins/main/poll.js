exports.default = {
   names: ['Main Menu'],
   tags: ['sendpoll'],
   command: ['sendpoll'],
   start: async (m, {
      conn
   }) => {
      const poll = ['ya', 'menu', 'tes']
      conn.sendPoll(m.chat, 'Ini adalah contoh poll', poll, m)
   }
}