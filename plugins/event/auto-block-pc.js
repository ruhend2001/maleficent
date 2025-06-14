module.exports = {
   start: async (m, {
      conn,
      isOwner,
      isPremium
   }) => {
      const owner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`);            
      if (db.settings.block_pc && !m.fromMe && !owner.includes(m.chat) && !m.isGroup && !isPremium && !isOwner) {
         console.log(`${m.sender.split('@')[0]} Blocked From Private Chat`)
         return await conn.updateBlockStatus(m.sender, 'block');         
      }
   }
}