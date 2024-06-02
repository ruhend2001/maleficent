export default {
   names: ['Main Menu'],
   tags: ['tes2'],
   command: ['tes2'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      text = text || 'contoh'
      let pesan = `Hay Ka @${m.sender.split('@')[0]}` // Pesan nya atau caption
      let media = setting.thumbnail; //media photo or video 
      //button disini hanya contoh saya dan bisa kalian buat sesuai keinginan ke plugins lagi
      let b1 = ['One', '.ping']
      let b2 = ['Two', '.ping ' + text] //text dari user atau yang lain   
      let b3 = ['Three', '.daftar saya anjing.30'] //text dari kita sendiri
      let b4 = ['Four', '.gdrive']
      let b5 = ['Five', '.tiktok']
      let b6 = ['Six', '.facebook']
      let b7 = ['Seven', '.facebook']
      let b8 = ['Eight', '.claim']
      let b9 = ['Nine', '.family100']
      let b10 = ['Ten', '.family100']
     //conn.sendButton(m.chat, media, pesan, b1, m)
     //conn.send2Button(m.chat, media, pesan, b1, b2, m)
     //conn.send3Button(m.chat, media, pesan, b1, b2, b3, m)
     //conn.send4Button(m.chat, media, pesan, b1, b2, b3, b4, m)
    //conn.send5Button(m.chat, media, pesan, b1, b2, b3, b4, b5, m)
    //conn.send6Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, m)   
    //conn.send7Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, b7, m)      
     //conn.send8Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, b7, b8, m)      
     //conn.send9Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, b7, b8, b9, m)      
    conn.send10Button(m.chat, media, pesan, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, m)      
    
   }
}
