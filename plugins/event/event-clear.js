module.exports = {
   start: async (m, {
      conn
   }) => {
      // if you wanna do both private and group just delete if (m.isGroup) 
      if (db.settings.auto_clear_chat && session_state) {
         if (m.isGroup) conn.deleteMessage(m, m.chat)
      }
   }
}