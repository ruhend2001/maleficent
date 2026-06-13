exports.default = {
   names: ['Owner'],
   tags: ['setppbot', 'setpp', 'delpp', 'hapuspp'],
   command: ['setppbot', 'setpp', 'delpp', 'hapuspp'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/delpp|hapuspp/.test(command)) return await conn.removeProfilePicture(conn.decodeJid(conn.user.id)), m.reply('👍');
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         try {
            const media = await quoted.download()
            await updateProfilePicture(conn, conn.decodeJid(conn.authState.creds.me.id), media);
            return m.reply(`Sukses mengganti Foto Profile Bot`)
         } catch (e) {
            console.log(e)
            return m.reply(`Terjadi kesalahan, coba lagi nanti\n${e}`)
         }
      } else {
         return m.reply(`Kirim gambar dengan caption *${prefix + command}* atau tag gambar yang sudah dikirim`)
      }
   },
   owner: true
};

