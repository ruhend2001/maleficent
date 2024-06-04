export default {
   names: ['Main Menu'],
   tags: ['hyd'],
   command: ['hyd'],
   start: async (m, {
      conn,
   }) => {
      //link is from you, you can costume it
      let caption = 'Tes'
      let media = setting.thumbnail // media is video or photo
      let button = ['OK', '.menu'] //optional you can fill whatever you want besides command 
      let h1 = ['Google', 'https://www.google.com'];
      let h2 = ['Facebook', 'https://www.facebook.com'];
      let h3 = ['Instagram', 'https://www.instagram.com/ru_hend_'];
      let h4 = ['Youtube', 'https://www.youtube.com/'];
      let h5 = ['Tiktok', 'https://www.tiktok.com/mr.beast'];
                                             
      conn.sendHydrated(m.chat, media, caption, button, h1, m) 
      //conn.send2Hydrated(m.chat, media, caption, button, h1, h2, m) 
     //conn.send3Hydrated(m.chat, media, caption, button, h1, h2, h3, m) 
     //conn.send4Hydrated(m.chat, media, caption, button, h1, h2, h3, h4, m) 
      //conn.send5Hydrated(m.chat, media, caption, button, h1, h2, h3, h4, h5, m)                                                                        
   }   
};

