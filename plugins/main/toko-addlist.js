exports.default = {
   names: ['Owner'],
   tags: ['addtoko', 'addlist'],
   command: ['addtoko', 'addlist'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan dagangan ke toko.\ncontoh ${prefix + command} nama toko item\n\nContoh :\n${prefix + command} toko1(spasi)Judul enter dan text Nya \n${prefix + command} toko2 Judul dan listnya\ntextnya \ndan seterusnya\n contoh \n.addtoko toko1 1.List Panel enter\n- Panel Ram 1GB 1000 \n- Panel Ram 2GB 2000\ndan seterusnya...\nnama toko bisa bebas`);
      let [toko, ...items] = text.split(" ");
      if (!items.length) return m.reply(`Masukkan item yang ingin ditambahkan ke ${toko}`);      
      let item = items.join(" ");      
      db.stores[toko] = item;
      m.reply(`Berhasil memasukkan ${item} \nke ${toko}`);
   },
   owner: true
}