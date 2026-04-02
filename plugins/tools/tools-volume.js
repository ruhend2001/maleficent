exports.default = {
   names: ['Tools'],
   tags: ['volume'],
   command: ['volume', 'vol'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/audio|video|document/.test(mime)) {
         m.reply(loading)
         const buffer = await quoted.download()
         const media = await Format.volume(buffer, text);
         conn.sendFile(m.chat, media, '', m);
      } else {
         return m.reply(`balas audio atau kirim audio yang mau volume nya di naikan atau di turunkan \n\nmenggunakan titik(.) untuk naik atau turun satu tingkat\n\ncontoh untuk naik volume: ${prefix+command} 1.2, 1.5, 2.0 dan seterusnya\n\ncontoh untuk turun volume: ${prefix+command} 0.9, 0.8, 0.5 dan seterusnya\nrekomen dari 0\n\ncontoh: ${prefix+command} 1.4\n\nkalo volume nya lagi misalnya setelah dinaikan / diturunkan tapi mau dinaikan / diturunkan lagi \npada original file / audio nya ya agar bersih hasilnya ny`)
      }
   },
   limit: 2
};
