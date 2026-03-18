module.exports = {
   start: async (m, {
      conn
   }) => {
      if (db.settings.auto_clear_chat && session_state) {
         // if you wanna do both private and group just delete if (m.isGroup) 
         if (m.isGroup) await conn.deleteMessage(m, m.chat);
      }           
   }
}