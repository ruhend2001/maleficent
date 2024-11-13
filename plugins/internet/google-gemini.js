exports.default = {
   names: ['Internet'],
   tags: ['gemini'],
   command: ['gemini', 'gem'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕒');
      const result = await JSON_URL('https://api.nyxs.pw/ai/gemini?text=' + text);
      conn.adReply(m.chat, loading, cover, m).then(() => {      
         conn.adReply(m.chat, `${result.result}`, "https://s.yimg.com/ny/api/res/1.2/vg49Jkpq4FAtqz3zUahC0w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/5f7be670-943f-11ee-af7f-41b7060d20ba", m, {
            showAds: true
         })
      })
   },
   limit: 2,
   register: true
}