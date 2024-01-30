export default {
   names: ['Group Menu'],
   tags: ['resetlink', 'revoke'],
   command: ['resetlink', 'revoke'],
   start: async (m) => {
      conn.groupRevokeInvite(m.chat)
      m.reply(`Sukses`)
   },
   group: true,
   admin: true
};