export default {
   names: ['Main Menu'],
   tags: ['slide'],
   command: ['slide'],
   start: async (m, {
      conn
   }) => {
      const caption = 'Hy There'
      //example media is setting.thumbnail you can replace with your photos
      //you can make multi galery and text each galleries
      const galery = [
         ['1', '', setting.thumbnail, []], 
         ['2', '', setting.thumbnail, []],
         ['3', '', setting.thumbnail, []],
         ['4', '', setting.thumbnail, []],
         ['5', '', setting.thumbnail, []]
      ]     
      conn.sendGalery(m.chat, caption, m, galery)
   }
};