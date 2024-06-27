process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error);
import 'maleficent-bot/index.js';
import Pino from 'pino';
import './lib/other.js'
import {
   makeInMemoryStore,
   useMultiFileAuthState,
   DisconnectReason
} from '@adiwajshing/baileys'
import {
   nocache,
   uncache
} from './lib/cache.js';
import {
   signalGroup
} from 'maleficent-bot';
const startWhatsApp = async () => {
   const store = makeInMemoryStore({
      logger: Pino().child({
         level: 'silent',
         stream: 'store'
      })
   });
   const { state, saveCreds } = await useMultiFileAuthState('./sessions');      
   const conn = await signalGroup(state, store);
   conn.ev.on('connection.update', (update) => {
      let {
         connection,
         lastDisconnect
      } = update;
      if (connection === 'open') {
         console.log(`🟢 Online`)
      } else if (connection === 'connecting') {
         console.log(`🟡 Reconnecting`)
      } else if (connection === 'close') {
         console.log(`🔴 Disconnected`)
         lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startWhatsApp() : console.log('Koneksi Terputus...')
      }
   });
   store.bind(conn.ev);
   conn.ev.on('creds.update', saveCreds);   
};
startWhatsApp();
