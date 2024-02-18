export const auto_BlockCaller = async (conn, json) => {
    const user_Call = await json.content[0].attrs['call-creator']
    conn.sendMessage(user_Call, {
        text: `*Kamu Telah Melanggar Ketentuan!* \n*Dilarang Menelepon Bot!*`
    })
    conn.updateBlockStatus(user_Call, 'block')
} 