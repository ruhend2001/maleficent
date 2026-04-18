exports.default = {
   names: ['Tools'],
   tags: ['speedsong', 'ssong'],
   command: ['speedsong', 'ssong'],
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
         const media = await Format.speed_song(buffer, text);
         conn.sendFile(m.chat, media, '', m);
      } else {
         return m.reply(`balas audio atau kirim audio yang mau speed nya di cepatkan atau di lambatkan \n\nmenggunakan titik(.) untuk naik atau turun satu tingkat\n\ncontoh untuk naik speed: ${prefix+command} 1.2, 1.5, 2.0 dan seterusnya\n\ncontoh untuk turun speed: ${prefix+command} 0.9, 0.8, 0.5 dan seterusnya\nrekomen dari 0\n\ncontoh: ${prefix+command} 1.4\n\nkalo speed nya lagi misalnya setelah dicepatkan / dilambatkan tapi mau dicepatkan / dilambatkan lagi \npada original file / audio nya ya agar bersih hasilnya ny`);
      }
   },
   limit: 2
};
