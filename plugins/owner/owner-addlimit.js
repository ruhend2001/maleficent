export default {
   names: ['Owner'],
   tags: ['addlimit'],
   command: ['addlimit', 'tambahlimit'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan nomor dan limitnya \natau tag yang mau di tambahkan limit dan masukan limitnya \nContoh: ${prefix+command} nomor limit\nContoh: ${prefix+command} 62xxxxx 25 \nAtau\nContoh: ${prefix+command} @tag 25`);
      let number = text.split(" ")[0]
      let limit = text.split(" ")[1]
      if (!limit) return m.reply(`Masukan limitnya berupa angka \nContoh: ${prefix+command} nomor(spasi)limit\nContoh: ${prefix+command} 62xxxxx 25\nAtau \nContoh: ${prefix+command} @tag 25`)
      let num = `${number.replace("@", "").trim()}@s.whatsapp.net`      
      User.addLimitUser(num, limit);
      m.reply(`Berhasil Menambahkan ${limit} Limit Ke ${num}`);
   },
   owner: true
};
