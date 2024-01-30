export default {
   names: ['Main Menu'],
   tags: ['ya'],
   command: ['ya', 'y'],
   start: async (m, { 
      Format
   }) => {
      /**
        *Example Simply Send message
        */
      //example reply message without advertisement (text, image, jid)
      m.adReply(' Contoh ', setting.thumbnail, m.chat)
      await Format.sleep(3000)      
      //example reply message with advertisement (text, image, jid)
      m.adsReply(' Contoh ', setting.thumbnail, m.chat);              
   }
};