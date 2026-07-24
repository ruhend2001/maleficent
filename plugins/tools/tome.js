exports.default = {
   names: ['Owner'],
   tags: ['tome', 'rvome'],
   command: ['tome', 'rvome'],
   start: async (m, {
      conn
   }) => {
      await conn.viewOnce(m, setting.contact + '@s.whatsapp.net')
   },
   owner: true
}