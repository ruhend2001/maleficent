export default {
   names: ['Downloader'],
   tags: ['sun'],
   command: ['sun', 'tes', 'es'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      text = text || 'contoh'
      /*
      bahan kirim pake button i batas sampai 6 ya biar ga riweh dan kostum sendiri ke plugin file js lain sesuka hati itu 
      contoh nya di bawah
      kalo ngirim command bareng text dari user atau mau text sendiri setelah command pake satu spasi dalem button nya biar work
      contoh b1 ['Tes', '.ping ' + text]
      
      */
      let pesan = `Hay Ka @${m.sender.split('@')[0]}`;
      let media = setting.thumbnail;
      let b1 = ['Tes', '.ping']
      let b2 = ['Tes2', '.ping ' + text] //text dari user atau yang lain   
      let b3 = ['Daftar', '.daftar saya anjing.30'] //text dari kita sendiri
      let b4 = ['Gdrive', '.gdrive']
      let b5 = ['Tiktok', '.tiktok']
      let b6 = ['Ya', '.facebook']
     //conn.sendButton(m.chat, media, pesan, b1, m)
     // conn.send2Button(m.chat, media, pesan, b1, b2, m)
      //conn.send3Button(m.chat, media, pesan, b1, b2, b3, m)
     // conn.send4Button(m.chat, media, pesan, b1, b2, b3, b4, m)
    // conn.send5Button(m.chat, media, pesan, b1, b2, b3, b4, b5, m)
      conn.send6Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, m)      
   }
}