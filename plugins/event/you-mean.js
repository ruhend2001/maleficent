module.exports = {
   start: async (m, {
      conn,
      prefix,
      command,
      Format
   }) => {
      let isMean = await Format.command_plugins();
      if (command && isMean && !m.isBaileys) {
         let mean = await Format.command_mean(command, isMean);
         if (mean && !(mean === command)) {
            return m.reply(`*❗mungkin maksud kamu:*\n ${java} *${prefix+mean}* `)
         }
      }
   }
}