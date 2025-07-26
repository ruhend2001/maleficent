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
      if (!text) throw `gunakan : .iqc jam|batre|pesan\ncontoh : ${prefix+command} 18:00|40|hai hai`;
      let [time, battery, ...msg] = text.split('|')
      if (!time||!battery||msg.length === 0) throw 'format salahh gunakan :\n.iqc jam|batre|pesan\nContoh:\n.iqc 18:00|40|hai hai'
      m.reply(loading)
      const messageText = encodeURIComponent(msg.join('|').trim())
      const image = await toBuffer(`https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&batteryPercentage=${battery}&carrierName=INDOSAT&messageText=${messageText}&emojiStyle=apple`);
      conn.sendFile(m.chat, image, '', m);
   },
   limit: 2
}