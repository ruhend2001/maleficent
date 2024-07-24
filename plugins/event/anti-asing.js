module.exports = {
   start: async (m, {
      conn,
      User
   }) => {
      if (m.sender.startsWith('93') || 
         m.sender.startsWith('212') || 
         m.sender.startsWith('91') || 
         m.sender.startsWith('92') || 
         m.sender.startsWith('90') || 
         m.sender.startsWith('54') || 
         m.sender.startsWith('55') || 
         m.sender.startsWith('95') || 
         m.sender.startsWith('94') || 
         m.sender.startsWith('256')) {
         conn.updateBlockStatus(m.sender, 'block');
         //optional wanna ban and block that users or not
         //User.addBannedUser(m.sender, true);
      }
   }
};