const toxic = ['kontol', 'anj', 'kntl', 'anjing', 'bngst', 'bgst', 'bangsat', 'memek', 'mmk', 'njir', 'najis', 'anjir', 'jing', 'njing', 'kntl', 'kontol', 'babi', 'monyet', 'mnyt', 'jembut', 'jmbt', 'lol', 'tolol'];
const agree = ['lanjut', 'loli']
module.exports = {
   start: async (m, {
      conn,
      budy,
      isOwner,
      isAdmins
   }) => {
      try {
         if ((!m.isGroup || db.chats[m.chat].antiToxic) && toxic.some(word => budy.toLowerCase().includes(word))) {
            if (agree.some(v => budy.toLowerCase().includes(v))) return
            if (m.fromMe || m.isBaileys || isAdmins || isOwner) return
            conn.adReply(m.chat, `Hey Ketikannya!`, cover, m);
         }
      } catch (e) {
         return false
      }
   }
}