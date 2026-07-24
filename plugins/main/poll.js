// old baileys poll was working but poll now maybe poll unsupported anymore

exports.default = {
   names: ['Main'],
   tags: ['sendpoll', 'poll'],
   command: ['sendpoll', 'poll'],
   start: async (m, {
      conn
   }) => {
      //ini adalah contoh kalo mau bikin button polling
      const poll = ['ya', 'tes']
      conn.sendPoll(m.chat, 'Ini adalah contoh poll', poll, m)
   }
}