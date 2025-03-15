module.exports = {
   start: async (m, {
      conn,
      prefix,
      command,
      Format
   }) => {
      if (command && !m.isBaileys) {
         const mean = Format.command_mean(command, cmd_plugins);
         if (mean && !(mean === command)) {
            if (prefix === undefined || prefix === '') {
               return false
            } else if (!(prefix === '')) {
               return await conn.adReply(m.chat, `*❗mungkin maksud kamu:*\n ${java} *${prefix+mean}*`, cover, m);
            }      
         }
      }
   }
}