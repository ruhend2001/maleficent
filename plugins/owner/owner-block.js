exports.default = {
   names: ['Owner'],
   tags: ['block', 'unblock'],
   command: ['block', 'blok', 'blockir', 'blokir', 'unblock', 'unblok', 'unblockir', 'unblokir'],
   start: async (m, { 
      conn, 
      text, 
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Tag / Masukkan Nomornya yang mau di blok / unblok\nContoh: ${prefix + command} nomor\nContoh: ${prefix + command} 62xxxxx`);
      const num = text.replace(/[@+\s-]/g, '') + '@s.whatsapp.net';
      const action = await /(unblock|unblok|unblockir|unblokir)/.test(command.toLowerCase()) ? 'unblock' : 'block';
      await conn.updateBlockStatus(num, action);
      m.reply(`Nomor ${num.split('@')[0]} berhasil di ${action === 'block' ? 'blokir' : 'unblok'}`);
   },
   owner: true
}