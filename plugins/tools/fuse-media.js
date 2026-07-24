exports.default = {
   names: ['Tools'],
   tags: ['fuse', 'fusemedia', 'gabungmedia'],
   command: ['fuse', 'fusemedia', 'gabungmedia'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      const event = db.users[m.sender].event_cmd;   
      if (event.fuse) throw `Kamu Masih Dalam Mode Editor Fuse Selesaikan Dulu\nBalas Media nya Dengan Mengetik/Mereply 1 Ke Video dan 2 Untuk Audio\n\nketik cancel untuk menutup mode fuse`
      let caption = `Fuse Adalah Fitur Untuk Menggabungkan Video dan Audio\n\n`
      caption += `Cara Penggunaan: \nKirim video dan audio yang mau di fuse atau di gabungkan\n\n`
      caption += `Ketik ${prefix+command} start\nuntuk memasuki mode editor fuse\ndan ikuti instruksi selanjutnya`
      if (!text) throw caption
      if (text === 'start') {
          let caption_2 = `Sekarang kamu masuk ke mode editor fuse\nkirim 2 media (lagu dan video)\n\nDan silahkan balas video itu dengan membalas / mengetik 1 \n\nKeluar ketik cancel\n`
          caption_2 += `Menunggu balasan / mengetik 1 ke video...`
          const data = {
              fuse: {
                 status: true,
                 video: false,
                 audio: false,                                                   
                 index_video: null,
                 index_audio: null,
              }
          }
          Object.assign(event, data)          
          m.reply(caption_2)
          await Format.sleep(300_000)
          delete event.fuse
      } else {
         throw caption
      }
   }
}