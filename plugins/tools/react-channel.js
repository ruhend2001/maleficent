exports.default = {
   names: ['Tools'],
   tags: ['reactch'],
   command: ['reactch', 'rch'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) throw 'Masukan link salah satu pesan channelnya yang mau di react dan kata kata reaction nya\ncontoh: \n' + prefix + command + ' https://whatsapp.com/channel/0029Vb5Xr5VFHWpy8grwv52/113 kontol\n\n' + 'link dan kata kata di pisahkan satu spasi saja'
      const [tautan, ...teksArr] = text.split(' '), teksEmoji = teksArr.join(' ')
      if (!teksEmoji) return m.reply('Teks untuk reaction tidak boleh kosong!')
      const simbolHuruf = { a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩", 0: "⓿", 1: "➊", 2: "➋", 3: "➌", 4: "➍", 5: "➎", 6: "➏", 7: "➐", 8: "➑", 9: "➒" };
      const hasilEmoji = teksEmoji.toLowerCase().split("").map((k) => (k === " " ? "―" : simbolHuruf[k] || k)).join("");
      const potongan = tautan.split('/'), idChannel = potongan[4], idPesan = potongan[5]
      try {
         const detail = await conn.newsletterMetadata("invite", idChannel);
         await conn.newsletterReactMessage(detail.id, idPesan, hasilEmoji)
         m.reply(`Reaction *${hasilEmoji}* berhasil dikirim ke pesan di saluran *${detail.name}*`)
      } catch (err) {
         return m.reply('Gagal mengirim reaction. Pastikan link dan ID benar\n' + err.message)
      }
   },
   premium: true
}