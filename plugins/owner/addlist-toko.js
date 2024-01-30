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
      if (!text) return m.reply(`Masukkan dagangan ke toko.\ncontoh ${prefix + command} nama toko item\n\nContoh pemakaian:\n${prefix + command} toko1(spasi)item1 atau textnya  \n${prefix + command} toko2 itemnya atau listnya \n\nDaftar List store atau toko aku adalah\n1. diamon ml\n2. diamon ff\ndan seterusnya contoh \n.addtoko toko1 text \n sepanjang panjangnya juga bisa`);
      let [toko, ...items] = text.split(" ");
      if (!items.length) return m.reply(`Masukkan item yang ingin ditambahkan ke ${toko}.`);
      let item = items.join(" ");
      await User.addToko(toko, item);
      m.reply(`Berhasil memasukkan ${item} ke ${toko}`);
   },
   owner: true
};