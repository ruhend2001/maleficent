exports.default = {
   names: ['Main Menu'],
   tags: ['sendpoll'],
   command: ['sendpoll'],
   start: async (m, {
      conn
   }) => {
      const poll = ['ya', 'menu', '.tiktok https://vt.tiktok.com/ZSYfBvx5d/', 'tes']
      conn.sendPoll(m.chat, 'Ini adalah contoh poll', poll, m)
   }
}