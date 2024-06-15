/**
 * send with media use conn.sendFile or conn.sendButton or Whatever instead that was just an example.
 * kalo misal nya muncil.blank panjang ya berarti g ada text atau .addtoko yang di masukan seperlunya kalian saja
 * hapus saja atau kurangi jika terlalu kebanyakan caption tokonya kalo kosong menghasilkan blank 
 */
export default {
   names: ['Main Menu'],
   tags: ['toko', 'shop'],
   command: ['toko', 'shop'],
   start: async (m, {
      conn,
      User
   }) => {
      let toko = await User.Toko();
      let shop1 = toko[0].toko1;
      let shop2 = toko[0].toko2;
      let shop3 = toko[0].toko3;
      let shop4 = toko[0].toko4;
      let shop5 = toko[0].toko5;
      let shop6 = toko[0].toko6;
      let shop7 = toko[0].toko7;
      let shop8 = toko[0].toko8;
      let shop9 = toko[0].toko9;
      let shop10 = toko[0].toko10;      
      let caption = `List Toko atau Dagangan\n${setting.botName}\n\n`
      caption += `${shop1}\n\n`
      caption += `${shop2}\n\n`
      caption += `${shop3}\n\n`
      caption += `${shop4}\n\n`
      caption += `${shop5}\n\n`
      caption += `${shop6}\n\n`
      caption += `${shop7}\n\n`
      caption += `${shop8}\n\n`
      caption += `${shop9}\n\n`
      caption += `${shop10}\n\n`
      m.adsReply(caption, setting.thumbnail, m.chat);     
   }
};
