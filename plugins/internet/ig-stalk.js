// fitur g guna anjg timbang buka apk ig nya langsung ajh mager amat
exports.default = {
   names: ['Internet'],
   tags: ['igstalk'],
   command: ['igstalk'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} instagram`);
      const data = (await toJSON(`https://zenzxz.dpdns.org/stalker/instagram?username=${text}`)).result;      
      if (data) {
         const caption = `${head('*IG PROFILE*')}\n\n` +
         `• User Name: ${data.username}\n` +
         `• Full Name: ${data.full_name}\n` +
         `• Total Post: ${data.posts.toLocaleString().replace(/\,/g,'.')}\n` +
         `• Followers: ${data.followers.toLocaleString().replace(/\,/g,'.')}\n` +
         `• Following: ${data.following.toLocaleString().replace(/\,/g,'.')}\n` +
         `• Bio: ${data.bio}\n` +
         `• Verified: ${data.is_verified ? 'Verified' : 'Unverified'}\n` +
         `• Public Profile: ${data.is_private ? 'Private Profile' : 'Public Profile'}\n` +
         `• Link: ${data.external_url}`
         conn.adReply(m.chat, caption, data.avatar || cover, m);
      } else {
         throw 'Profile Not Found!'
      }
   },
   limit: true
}