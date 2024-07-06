/**
 * send with media use conn.sendFile or conn.sendButton or Whatever instead that was just an example.
 * .addtoko or .deltoko
 */
export default {
   names: ['Main Menu'],
   tags: ['toko', 'shop'],
   command: ['toko', 'shop'],
   start: async (m, {
      conn,
      User
   }) => {
      let toko = await User.Toko()[0];
      let shop1 = toko.toko1;
      let shop2 = toko.toko2;
      let shop3 = toko.toko3;
      let shop4 = toko.toko4;
      let shop5 = toko.toko5;
      let shop6 = toko.toko6;
      let shop7 = toko.toko7;
      let shop8 = toko.toko8;
      let shop9 = toko.toko9;
      let shop10 = toko.toko10;      
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
      m.adsReply(caption.trim(), setting.thumbnail, m.chat);     
   }
};
