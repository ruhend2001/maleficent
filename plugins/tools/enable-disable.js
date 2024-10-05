exports.default = {
   names: ['Tools'],
   tags: ['on', 'off'],
   command: ['on', 'off', 'enable', 'disable'],
   start: async (m, {
      conn,
      text,
      prefix,
      cmd,
      command,
      groupName,
      isOwner,
      isAdmins
   }) => {
      let v = `${prefix + command} `
      let oa = isOwner || isAdmins
      let cmd_on = ['on', 'enable']
      let cmd_off = ['off', 'disable']
      let caption = `*List Options ${command}*\n*Contoh:* \n\n`
      caption += v + `welcome \n`
      caption += v + `antilink \n`
      caption += v + `viewonce / once \n`
      caption += v + `autodl / autodown \n`
      caption += v + `antitoxic / toxic`
      if (!text) return m.reply(caption);
      switch (text) {
         case 'welcome': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!oa) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(cmd)) {
               db.chats[m.chat].welcome = true
               m.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
            } else if (cmd_off.includes(cmd)) {
               db.chats[m.chat].welcome = false
               m.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
            }
         }
         break
         case 'antilink': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!oa) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(cmd)) {
               db.chats[m.chat].antilink = true
               m.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(cmd)) {
               db.chats[m.chat].antilink = false
               m.reply(`Antilink berhasil matikan di grup ${groupName}`);
            }
         }
         break
         case 'viewonce':
         case 'once': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!oa) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(cmd)) {
               db.chats[m.chat].viewOnce = true
               m.reply(`View Once berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(cmd)) {
               db.chats[m.chat].viewOnce = false
               m.reply(`View Once berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'autodl':
         case 'autodown': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(cmd)) {
               setting.auto_dl = true
               await save_setting()
               await m.reply(`auto download berhasil diaktifkan\nrestarting...`);
               reset();
            } else if (cmd_off.includes(cmd)) {
               setting.auto_dl = false
               await save_setting()
               await m.reply(`auto download berhasil matikan\nrestarting...`);
               reset();
            }
         }
         break
         case 'antitoxic':
         case 'toxic': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!oa) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(cmd)) {
               db.chats[m.chat].antiToxic = true
               m.reply(`Anti Toxic berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(cmd)) {
               db.chats[m.chat].antiToxic = false
               m.reply(`Anti Toxic berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
      }
   }
}