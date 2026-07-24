exports.default = {
   names: ['Maker'],
   tags: ['iqc', 'iphoneqc'],
   command: ['iqc', 'iphoneqc'],
   start: async (m, {
      conn,
      text,
      prefix,
      command      
   }) => {
      if (!text) throw `gunakan : .iqc pesan\ncontoh : ${prefix+command} hai`;
      m.reply(loading)
      const battery = Math.floor(Math.random() * 100) + 1;     
      const image = await toBuffer(`https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(waktu.time)}&batteryPercentage=${battery}&carrierName=Smartfren&messageText=${text}&emojiStyle=apple`);
      conn.sendFile(m.chat, image, '', m);
   },
   limit: 3
}