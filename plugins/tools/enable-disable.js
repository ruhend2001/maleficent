const { restoreMongo } = require('../../lib/src/cloud/mongo-db.js');
const { restoreGithub } = require('../../lib/src/cloud/github-db.js');
exports.default = {
   names: ['Tools'],
   tags: ['on', 'off'],
   command: ['on', 'off', 'enable', 'disable'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format,
      isOwner,
      isAdmins,
      isPremium,
      groupName,
   }) => {
      const cmd_on = ['on', 'enable']
      const cmd_off = ['off', 'disable']
      const owner_admin = isOwner || isAdmins
      const $ = `${prefix + command} `
      let caption = `*List Options ${command}*\n*contoh:* \n\n`
      caption += $ + `welcome \n`
      caption += $ + `antilink \n`
      caption += $ + `viewonce / once \n`
      caption += $ + `antitoxic / toxic \n`
      caption += $ + `antiphoto \n`
      caption += $ + `antibot \n`
      caption += $ + `autosticker / sticker\n`      
      caption += $ + `antitagsw \n\n`; 
      if (isOwner) {
         caption += zw + ` *OWNER* \n`
         caption += $ + `antispam / spam \n`
         caption += $ + `hd / remini\n`
         caption += $ + `sholat / autosholat\n`
         caption += $ + `blockpc / autoblockpc\n`
         caption += $ + `autodl / autodown \n`
         caption += $ + `autobackup \n`
         caption += $ + `anticall \n`
         caption += $ + `autoreadsw / readsw\n`
         caption += $ + `autobio / bio \n`
         caption += $ + `chat_ai / ai \n\n`
         caption += $ + `*grouponly / gconly*\nUntuk mengganti akses bot ke mode group atau keduanya private and group\n\n`
         caption += $ + `*respononlygroup / respononlygc*\nUntuk mematikan dan mengaktifkan respon message groupOnly\n\n`
         caption += $ + '*adreply*\nUntuk mengaktifkan mode pesan dengan thumbnail atau photo\n\n'
         caption += $ + '*mystery / misteri*\nUntuk mematikan dan mengaktifkan misteri box\n\n'
         caption += $ + '*typinggc / typinggroup*\nUntuk mematikan dan mengaktifkan typing atau mengetik di group\n\n'
         caption += $ + '*typingpc / typingprivate*\nUntuk mematikan dan mengaktifkan typing atau mengetik di private chat\n\n'
         caption += $ + '*recordinggc / recordinggroup*\nUntuk mematikan dan mengaktifkan recording atau merekam di group\n\n'
         caption += $ + '*recordingpc / recordingprivate*\nUntuk mematikan dan mengaktifkan recording atau merekam di private chat\n\n'
         caption += $ + '*readgc / readgroup*\nUntuk mematikan dan mengaktifkan read atau membaca chat di group\n\n'
         caption += $ + '*readpc / readprivate*\nUntuk mematikan dan mengaktifkan read atau membaca chat di private chat\n\n'
         caption += 'Untuk mengubah pengaturan lain ada juga di menu .set'
      };
      if (!text) return m.reply(caption.trim());
      switch (text.toLowerCase()) {
         case 'welcome': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].welcome = true
               m.reply(`Welcome Berhasil Di Nyalakan Di Group ${groupName}`)
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].welcome = false
               m.reply(`Welcome Berhasil Di Matikan Di Group ${groupName}`)
            }
         }
         break
         case 'antilink': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].antilink = true
               m.reply(`Antilink berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].antilink = false
               m.reply(`Antilink berhasil matikan di grup ${groupName}`);
            }
         }
         break
         case 'viewonce':
         case 'once': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].viewOnce = true
               m.reply(`View Once berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].viewOnce = false
               m.reply(`View Once berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'anticall': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               save.global('global.anticall = false', 'global.anticall = true');
               m.reply('anti call berhasil di aktifkan')
            } else if (cmd_off.includes(command)) {
               save.global('global.anticall = true', 'global.anticall = false');
               m.reply('anti call database berhasil di matikan')
            }
         }
         break
         case 'blockpc':
         case 'autoblockpc': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               if (global.group_mode) return m.reply('Mode group sedang aktif tidak bisa menyalakan, matikan terlebih dahulu .off gconly');
               db.settings.block_pc = true
               m.reply('auto block private chat berhasil di aktifkan')
            } else if (cmd_off.includes(command)) {
               db.settings.block_pc = false
               m.reply('auto block private chat berhasil di matikan')
            }
         }
         break
         case 'sholat':
         case 'autosholat': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               save.global('global.auto_sholat = false', 'global.auto_sholat = true');
               m.reply('auto sholat berhasil di aktifkan')
            } else if (cmd_off.includes(command)) {
               save.global('global.auto_sholat = true', 'global.auto_sholat = false');
               m.reply('auto sholat berhasil di matikan')
            }
         }
         break
         case 'autodl':
         case 'autodown': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.settings.auto_down = true
               m.reply(`auto download berhasil diaktifkan`);
            } else if (cmd_off.includes(command)) {
               db.settings.auto_down = false
               m.reply(`auto download berhasil matikan`);
            }
         }
         break
         case 'autosticker':
         case 'sticker':
         case 'stiker': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.settings.auto_sticker = true
               m.reply(`auto sticker berhasil diaktifkan\nsekarang kamu dapat membuat stiker hanya dengan mengirim foto`);
            } else if (cmd_off.includes(command)) {
               db.settings.auto_sticker = false
               m.reply(`auto sticker berhasil matikan`);
            }
         }
         break
         case 'antitoxic':
         case 'toxic': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].antiToxic = true
               m.reply(`Anti Toxic berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].antiToxic = false
               m.reply(`Anti Toxic berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'antiphoto': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].antiPhoto = true
               m.reply(`Anti Photo berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].antiPhoto = false
               m.reply(`Anti Photo berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'antibot': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].antiBot = true
               m.reply(`Anti Bot berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].antiBot = false
               m.reply(`Anti Bot berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'antitagsw': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!owner_admin) return m.reply(mess.GrupAdmin);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].tagsw = true
               m.reply(`Anti Tag SW berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].tagsw = false
               m.reply(`Anti Tag SW berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'hd':
         case 'remini': {
            if (!m.isGroup) return m.reply(mess.OnlyGroup);
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.chats[m.chat].hd = true
               m.reply(`HD / Remini berhasil diaktifkan di grup ${groupName}`);
            } else if (cmd_off.includes(command)) {
               db.chats[m.chat].hd = false
               m.reply(`HD / Remini berhasil dimatikan di grup ${groupName}`);
            }
         }
         break
         case 'autoreadsw':
         case 'readsw': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.settings.readsw = true
               m.reply(`auto readsw berhasil diaktifkan`);
            } else if (cmd_off.includes(command)) {
               db.settings.readsw = false
               m.reply(`auto readsw berhasil dimatikan`);
            }
         }
         break
         case 'autobio':
         case 'bio': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.settings.autobio = true
               m.reply(`auto bio/status berhasil diaktifkan`);
            } else if (cmd_off.includes(command)) {
               db.settings.autobio = false
               await Format.sleep(3000);
               await conn.updateProfileStatus(' ‎');
               m.reply(`auto bio/status berhasil dimatikan`);
            }
         }
         break
         case 'antispam':
         case 'spam': {
            if (!isOwner) return m.reply(mess.OnlyOwner);
            if (cmd_on.includes(command)) {
               db.settings.antispam = true
               m.reply(`anti spam berhasil diaktifkan`);
            } else if (cmd_off.includes(command)) {
               db.settings.antispam = false
               m.reply(`anti spam berhasil dimatikan`);
            }
         }
         break
         case 'chat_ai':
         case 'ai': {
            if (!m.isGroup && !isPremium) return m.reply(mess.premium)
            if (m.isGroup && !owner_admin) return m.reply(mess.GrupAdmin);
            if (!m.isGroup && cmd_on.includes(command)) {
               db.users[m.sender].chat_ai = true
               m.reply(`Auto Chat AI Berhasil Di Nyalakan`);
            } else if (m.isGroup && cmd_on.includes(command)) {
               db.chats[m.chat].chat_ai = true
               m.reply(`Auto Chat AI Berhasil Di Nyalakan Di Group ${groupName}`);
            } else if (!m.isGroup && cmd_off.includes(command)) {
               db.users[m.sender].chat_ai = false
               m.reply(`Auto Chat AI Berhasil Di Matikan`);
            } else if (m.isGroup && cmd_off.includes(command)) {
               db.chats[m.chat].chat_ai = false
               m.reply(`Auto Chat AI Berhasil Di Matikan Di Group ${groupName}`);
            }
         }
         break
         case 'grouponly':
         case 'gconly': {         
            if (cmd_on.includes(command)) {
               save.global('global.group_mode = false', 'global.group_mode = true');
               m.reply(`Sukses Mengubah Ke Group Mode \nPrivate Chat Tidak Bisa Di Akses Kecuali Aku , Owner Dan Premium`);            
            } else if (cmd_off.includes(command)) {
               save.global('global.group_mode = true', 'global.group_mode = false');
               m.reply(`Sukses Mematikan Group Mode Sekarang Private Chat Dapat Diakses Semua Orang`);            
            }
         }
         break
         case 'respononlygroup':
         case 'respononlygc': {         
            if (cmd_on.includes(command)) {
               save.global('global.group_only_message = false', 'global.group_only_message = true');            
               m.reply(`Sukses Mengaktifkan Respon ${mess.groupOnly} Pada Chat Pribadi\nJika Mode Group Aktif Dan Jika Ada Pesan Datang Di Pribadi Chat, Kecuali Aku, Owner, Dan Premium Maka Akan Merespon ${mess.groupOnly}\n`);            
            } else if (cmd_off.includes(command)) {
               save.global('global.group_only_message = true', 'global.group_only_message = false');            
               m.reply(`Sukses Mematikan Respon Pesan ${mess.groupOnly} Pada Chat Pribadi\nJika Mode Group Aktif Dan Jika Ada Pesan Datang Di Pribadi Chat, Kecuali Aku, Owner, Dan Premium Maka Sama Sekali Tidak Akan Merespon Apapun\n`);
            }
         }
         break
         case 'adreply': {         
            if (cmd_on.includes(command)) {
               save.global('global.adReply = false', 'global.adReply = true');
               m.reply(`adReply Berhasil Di Aktifkan`);
            } else if (cmd_off.includes(command)) {
               save.global('global.adReply = true', 'global.adReply = false');
               m.reply(`adReply Berhasil Di Matifkan`);
            } 
         }
         break
         case 'mystery':
         case 'misteri': {
            if (cmd_on.includes(command)) {
               save.global('global.mystery_box = false', 'global.mystery_box = true');        
               m.reply(`Mystery Box Berhasil Di Aktifkan`);
            } else if (cmd_off.includes(command)) {
               save.global('global.mystery_box = true', 'global.mystery_box = false');        
               m.reply(`Mystery Box Berhasil Di Matikan`);
            }   
         }
         break
         case 'typinggc':
         case 'typinggroup': {
            if (cmd_on.includes(command)) {
               save.global('global.typing_group = false', 'global.typing_group = true');        
               m.reply(`Typing Group / Mengetik Di Group Berhasil Di Aktifkan`);         
            } else if (cmd_off.includes(command)) {
               save.global('global.typing_group = true', 'global.typing_group = false');        
               m.reply(`Typing Group / Mengetik Di Group Berhasil Di Matikan`);            
            }
         }
         break
         case 'typingpc':
         case 'typingprivate': {
            if (cmd_on.includes(command)) {
               save.global('global.typing_private = false', 'global.typing_private = true');        
               m.reply(`Typing Private / Mengetik Di Private Chat Berhasil Di Aktifkan`);         
            } else if (cmd_off.includes(command)) {
               save.global('global.typing_private = true', 'global.typing_private = false');        
               m.reply(`Typing Private / Mengetik Di Private Chat Berhasil Di Matikan`);            
            }   
         }
         break
         case 'recordinggc':
         case 'recordinggroup': {
            if (cmd_on.includes(command)) {
               save.global('global.recording_group = false', 'global.recording_group = true');        
               m.reply(`Recording Group / Merekam Di Group Berhasil Di Aktifkan`);         
            } else if (cmd_off.includes(command)) {
               save.global('global.recording_group = true', 'global.recording_group = false');        
               m.reply(`Recording Group / Merekam Di Group Berhasil Di Matikan`);            
            }
         }
         break
         case 'recordingpc':
         case 'recordingprivate': {
            if (cmd_on.includes(command)) {
               save.global('global.recording_private = false', 'global.recording_private = true');        
               m.reply(`Recording Private / Merekam Di Private Chat Berhasil Di Aktifkan`);         
            } else if (cmd_off.includes(command)) {
               save.global('global.recording_private = true', 'global.recording_private = false');        
               m.reply(`Recording Private / Merekam Di Private Chat Berhasil Di Matikan`);            
            }     
         }
         break
         case 'readgc':
         case 'readgroup': {         
            if (cmd_on.includes(command)) {
               save.global('global.read_group = false', 'global.read_group = true');
               m.reply(`Read Group / Membaca Di Group Berhasil Di Aktifkan`);          
            } else if (cmd_off.includes(command)) {
               save.global('global.read_group = true', 'global.read_group = false');
               m.reply(`Read Group / Membaca Di Group Berhasil Di Matikan`); 
            }
         }
         break
         case 'readpc':
         case 'readprivate': {         
            if (cmd_on.includes(command)) {
               save.global('global.read_private = false', 'global.read_private = true');
               m.reply(`Read Private / Membaca Di Private Chat Berhasil Di Aktifkan`);          
            } else if (cmd_off.includes(command)) {
               save.global('global.read_private = true', 'global.read_private = false');
               m.reply(`Read Private / Membaca Di Private Chat Berhasil Di Matikan`); 
            }
         }
         break
        // default: return m.reply(`pala bapak kau, mana ada ${text} cobalah yang benar`)
      };
      if (text == 'autobackup' || text == 'backup' || text.split(" ")[1]) {
         if (!isOwner) return m.reply(mess.OnlyOwner);
         const pick = text.split(" ")[1];
         if (!pick) throw `masukan tempat database yang di gunakan contoh ${prefix+command} mongo \nbaru tersedia mongo dan github`;
         if (!['mongo', 'github'].includes(pick)) throw 'hanya baru ada mongo dan github saja sekarang';
         if (cmd_on.includes(command) && pick === 'mongo') {
            if (backup_mongo) throw 'autobackup monggo audah di aktifkan atau di nyalakan sebelum nya untuk cek ketik .status';
            m.reply('menyalakan auto backup db ke mongo...')
            const response = await restoreMongo();
            if (!response) {
               return response
            } else {
               await save.global('global.backup_mongo = false', 'global.backup_mongo = true');
               await m.reply('auto backup monggo database berhasil di aktifkan\nrestarting...')
               reset()
            }
         } else if (cmd_off.includes(command) && pick === 'mongo') {
            if (!backup_mongo) throw 'autobackup monggo audah di nonaktifkan atau dimatikan sebelumnya\nuntuk cek ketik .status';
            await m.reply('mematikan auto backup db ke mongo...')
            await save.global('global.backup_mongo = true', 'global.backup_mongo = false');
            await m.reply('auto backup monggo database berhasil di matikan\nrestarting...')
            reset()
         } else if (cmd_on.includes(command) && pick === 'github') {
            if (backup_github) throw 'autobackup github sudah di aktifkan atau di nyalakan sebelum nya untuk cek ketik .status';
            m.reply('menyalakan auto backup db ke cloud github...')
            const data = await restoreGithub();
            if (!data.status) {
               await m.reply('Gagal Menyalakan autobackup github')
               throw data
            } else if (data.status) {
               await save.global('global.backup_github = false', 'global.backup_github = true')
               return await m.reply('auto backup github database berhasil di aktifkan\nrestarting...'), reset()  
            }
         } else if (cmd_off.includes(command) && pick === 'github') {
            if (!backup_github) throw 'autobackup github sudah di nonaktifkan atau dimatikan sebelumnya\nuntuk cek ketik .status';
            await m.reply('mematikan auto backup db ke cloud github...')
            save.global('global.backup_github = true', 'global.backup_github = false');
            return m.reply('auto backup database github berhasil di matikan')
         }
      } 
   }
}