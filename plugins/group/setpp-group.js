exports.default = {
   names: ['Owner'],
   tags: ['setppgroup'],
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
            let media = await quoted.download()
            let { img } = await pepe(media)
            await conn.query({
               tag: 'iq',
               attrs: {
                  to: m.chat,
                  type: 'set',
                  xmlns: 'w:profile:picture'
               },
               content: [{
                  tag: 'picture',
                  attrs: {
                     type: 'image'
                  },
                  content: img
               }]
            })
            m.reply(`Sukses mengganti PP Group`)
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

const jimp_1 = require('jimp');
async function pepe(media) {
   const jimp = await jimp_1.read(media)
   const min = await jimp.getWidth()
   const max = await jimp.getHeight()
   const cropped = await jimp.crop(0, 0, min, max)
   return {
      img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
      preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
   }
}
