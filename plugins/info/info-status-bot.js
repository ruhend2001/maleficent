exports.default = {
   names: ['Info', 'Main Menu'],
   tags: ['infobot', 'statusbot'],
   command: ['infobot', 'statusbot', 'status'],
   start: async (m, {
      conn
   }) => {
      const Y = 'Aktif ✅', T = 'Tidak Aktif ❎';
      let caption = `*${zw} STATUS BOT 🤖*\n*${setting.botName}*\n`
      caption += `Self: ${global.self ? Y : T}\n`
      caption += `Auto Download: ${global.autodl ? Y : T}\n`
      caption += `Auto Backup DB: ${global.auto_backup ? Y : T}\n`
      caption += `Auto Status Bio: ${db.settings.autobio ? Y : T}\n`
      caption += `Auto Read Story: ${db.settings.readsw ? Y : T}\n`      
      caption += `Anti Call: ${global.anticall ? Y : T}\n`
      caption += `Auto Block PC: ${db.settings.block_pc ? Y : T}\n`
      caption += `Group Mode: ${global.group_mode ? Y : T}\n`
      caption += `Mess Group Only: ${global.group_only_message ? Y : T}\n`
      caption += `AdReply: ${global.adReply ? Y : T}\n`
      caption += `Use Limit Message: ${global.use_limit_message ? Y : T}\n`
      caption += `Limit AdReply: ${global.limit_adReply ? Y : T}\n`
      caption += `Read Group: ${global.read_group ? Y : T}\n`
      caption += `Read Private: ${global.read_private ? Y : T}\n`
      caption += `Typing Group: ${global.typing_group ? Y : T}\n`
      caption += `Typing Private: ${global.typing_private ? Y : T}\n`
      caption += `Recording Group: ${global.recording_group ? Y : T}\n`
      caption += `Recording Private: ${global.recording_private ? Y : T}\n`
      caption += `Ram Set: ${setting.ram}\n`
      caption += `Prefix: ${db.settings.prefix}\n\n`
      caption += `Untuk mengubah pengaturan langsung dari bot owner bisa cek di menu .set atau ada juga di menu .on .off`      
      conn.adReply(m.chat, caption, cover, m)
   },
   owner: true
}