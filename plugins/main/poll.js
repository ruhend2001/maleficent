exports.default = {
   names: ['Main Menu'],
   tags: ['sendpoll'],
   command: ['sendpoll'],
   start: async (m, {
      conn
   }) => {
      /**
       * example simple send poll message
       * for poll command will be available soon this is just for an example
       */
      const poll = ['1', '2', '3']
      conn.sendPoll(m.chat, 'Ini adalah contoh sendPoll', poll)
   }
};