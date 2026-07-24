exports.default = {
   names: ['Group'],
   tags: ['setppgc', 'setppgroup'],
   command: ['setppgc', 'setppgroup'],
   start: async (m, {
      conn,
      command,
      prefix,
      mime,
      quoted
   }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         try {
            const media = await quoted.download()
            await updateProfilePicture(conn, m.chat, media);
            return m.reply(`Sukses mengganti Foto Profile Group`)
         } catch (e) {
            console.log(e)
            return m.reply(`Terjadi kesalahan, coba lagi nanti\n${e}`)
         }
      } else {
         return m.reply(`Kirim gambar dengan caption *${prefix + command}* atau tag gambar yang sudah dikirim`)
      }
   },
   admin: true,
   group: true
};