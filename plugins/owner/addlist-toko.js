export default {
   names: ['Owner'],
   tags: ['addtoko', 'addlist'],
   command: ['addtoko', 'addlist'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan dagangan ke toko.\ncontoh ${prefix + command} nama toko item\n\nContoh pemakaian:\n${prefix + command} toko1(spasi)Judul enter dan text Nya \n${prefix + command} toko2 Judul dan listnya\ntextnya \ndan seterusnya\n contoh \n.addtoko toko1 1.List Panel enter\n- Panel Ram 1GB 1000 \n- Panel Ram 2GB 2000\ndan seterusnya...\n\nSepanjang panjangnya juga bisa\nUntuk Mengatur menampilkan caption text toko nya silahkan edit di plugins/main/toko.js (bawaan sc)`);
      let [toko, ...items] = text.split(" ");
      if (!items.length) return m.reply(`Masukkan item yang ingin ditambahkan ke ${toko}.`);
      let item = items.join(" ");
      await User.addToko(toko, item);
      m.reply(`Berhasil memasukkan ${item} ke ${toko}`);
   },
   owner: true
};
