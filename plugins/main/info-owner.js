/*exports.default = {
   names: ['Main Menu'],
   tags: ['owner'],
   command: ['owner', 'pemilik', 'creator'],
   start: async (m, {
      conn
   }) => {
      let ownerNumbers = setting.ownerNumber;
      let ownerLinks = [];
      let sendContact = (jid, numbers, name, quoted, mn) => {
         let number = setting.contact
         let vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + setting.ownerName + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
            'END:VCARD'
         return conn.sendMessage(m.chat, {
            contacts: {
               displayName: name,
               contacts: [{
                  vcard
               }]
            },
            mentions: mn ? mn : []
         }, { ...conn_bind, quoted: quoted })
      }
      for (let i = 0; i < ownerNumbers.length; i++) {
         const number = ownerNumbers[i].replace("@s.whatsapp.net", "");
         ownerLinks.push(`wa.me/${number}`);
         if (i === 0) {
            await sendContact(m.chat, ownerNumbers[i], "", m);
         }
      }
      if (ownerLinks.length > 1) {
         let text = "Nomor Owner Lainnya";
         ownerLinks.forEach((link, index) => {
            text += `\n${index + 1}. ${link}`;
         });
         m.reply(text);
      }
   }
};
*/
// ini ajh lah simple
exports.default = {
   names: ['Main Menu'],
   tags: ['owner'],
   command: ['owner', 'pemilik', 'creator'],
   start: async (m) => {
      let owner = `Nih Ka Nomor Owner Ku \nwa.me/${setting.contact} \nSilahkan Chat `
      m.reply(owner)
   }
};
