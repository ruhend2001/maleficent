exports.default = {
   names: ['Info', 'Main'],
   tags: ['infobot', 'statusbot'],
   command: ['infobot', 'statusbot', 'status'],
   start: async (m, {
      conn,
      isOwner
   }) => {
      const Y = 'Aktif 🟢', T = 'Tidak Aktif 🔴';
      let caption = `*${zw} STATUS BOT 🤖*\n${setting.botName}\n${conn.authState.creds.me.name}\n\n`
      caption += `Cloud DB: ${global.backup_mongo || global.backup_github || global.backup_gitlab || global.backup_supabase || global.backup_neon ? Y : T}\n`
      caption += `${global?.backup_mongo ? 'Monggo DB = Aktif ✅' : 'Monggo DB = Tidak Aktif ❎'}\n`
      caption += `${global?.backup_github ? 'Github DB = Aktif ✅' : 'Github DB = Tidak Aktif ❎'}\n` 
      caption += `${global?.backup_gitlab ? 'Gitlab DB = Aktif ✅' : 'Gitlab DB = Tidak Aktif ❎'}\n`    
      caption += `${global?.backup_supabase ? 'Supabase DB = Aktif ✅' : 'Supabase DB = Tidak Aktif ❎'}\n` 
      caption += `${global?.backup_neon ? 'Neon DB = Aktif ✅' : 'Neon DB = Tidak Aktif ❎'}\n\n` 
      caption += `Self: ${global.self ? Y : T}\n`
      caption += `Auto Download: ${db.settings.auto_down ? Y : T}\n`
      caption += `Auto Status Bio: ${db.settings.auto_bio ? Y : T}\n`
      caption += `Auto Read Story: ${db.settings.readsw ? Y : T}\n`      
      caption += `Auto React Story: ${db.settings.reactsw ? Y : T}\n`   
      caption += `Anti Call: ${global.anticall ? Y : T}\n`
      caption += `Auto Block PC: ${db.settings.block_pc ? Y : T}\n`
      caption += `Auto Clear Chat: ${db.settings.auto_clear_chat ? Y : T}\n`
      caption += `Group Mode: ${global.group_mode ? Y : T}\n`
      caption += `Mess Group Only: ${global.group_only_message ? Y : T}\n`      
      caption += `Mystery Box: ${global.mystery_box ? Y : T}\n`      
      caption += `AdReply: ${global.adReply ? Y : T}\n`
      caption += `Use Limit Message: ${global.use_limit_message ? Y : T}\n`
      caption += `Limit AdReply: ${global.limit_adReply ? Y : T}\n`
      caption += `Read Group: ${global.read_group ? Y : T}\n`
      caption += `Read Private: ${global.read_private ? Y : T}\n`
      caption += `Typing Group: ${global.typing_group ? Y : T}\n`
      caption += `Typing Private: ${global.typing_private ? Y : T}\n`
      caption += `Recording Group: ${global.recording_group ? Y : T}\n`
      caption += `Recording Private: ${global.recording_private ? Y : T}\n`
      caption += `Jadibot: ${global.jadibot_engine ? Y : T}\nEngine ${global.jadibot_engine_version ? global.jadibot_engine_version : '' }\n\n`      
      caption += `Ram Set: ${setting.ram}\n`
      caption += `Prefix: ${db.settings.prefix == 'multi' ? 'multi (tanpa prefix)' : 'single (perlu prefix)'}\n\n`
      caption += `Untuk mengubah pengaturan langsung dari bot owner bisa cek di menu .set atau ada juga di menu .on .off`      
      const { key } = await conn.reply(m.chat, caption, m)
      if (!isOwner) return await sleep(5000), m.delete(key);
   }
}