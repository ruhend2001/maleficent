exports.default = {
   names: ['Group'],
   tags: ['groupoff', 'tutup'],
   command: ['groupoff', 'tutup'],
   start: async (m, {
      conn
   }) => {
      await conn.groupSettingUpdate(m.chat, "announcement");
      m.reply(`Group Telah Di Tutup Semua Anggota Tidak Dapat Mengirim Pesan Admin Kontol`)
   },
   group: true,
   admin: true
};