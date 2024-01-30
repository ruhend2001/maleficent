import fs from 'fs'
import chalk from 'chalk'
import moment from 'moment'
import path, {
    dirname
} from 'path'
import {
    createRequire
} from 'module';
import {
    fileURLToPath
} from 'url'
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url))
const time = moment().format('HH:mm:ss DD/MM/YYYY');

export function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)];
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

export function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module));
        cb(module);
    });
}
const _0x2fc190=_0x4141;function _0x4141(_0x47b09a,_0x507eb9){const _0x569b2b=_0x20c9();return _0x4141=function(_0x2f543f,_0x25464b){_0x2f543f=_0x2f543f-(-0x1f52+0x1183*-0x1+0x1099*0x3);let _0x47e5cb=_0x569b2b[_0x2f543f];return _0x47e5cb;},_0x4141(_0x47b09a,_0x507eb9);}(function(_0x57e02f,_0x253a9b){const _0x4d30bb=_0x4141,_0x3f3e1c=_0x57e02f();while(!![]){try{const _0x2c2ede=parseInt(_0x4d30bb(0x104))/(-0x977+0x1*-0x1212+0x1b8a)*(-parseInt(_0x4d30bb(0xf7))/(0x5*-0xc+-0xea8+0x773*0x2))+-parseInt(_0x4d30bb(0x10f))/(-0x2c*-0x5f+-0xff+-0xf52)+-parseInt(_0x4d30bb(0x108))/(-0xccc+0x10e7*0x2+-0x14fe)+parseInt(_0x4d30bb(0x103))/(0x1*-0x1055+-0x1a3f*0x1+0x2a99)+-parseInt(_0x4d30bb(0x111))/(0x93f+-0x1bb8*-0x1+-0x24f1)*(parseInt(_0x4d30bb(0x106))/(-0x1bf*0xd+0x2*-0x929+-0x94*-0x47))+parseInt(_0x4d30bb(0x10d))/(0xca*0xe+-0x1*0x22b+-0x8d9*0x1)*(-parseInt(_0x4d30bb(0x110))/(0x1f2e+0x1487+0x1*-0x33ac))+parseInt(_0x4d30bb(0x10b))/(0x1267+-0x1d1b+0xabe);if(_0x2c2ede===_0x253a9b)break;else _0x3f3e1c['push'](_0x3f3e1c['shift']());}catch(_0x1286a6){_0x3f3e1c['push'](_0x3f3e1c['shift']());}}}(_0x20c9,-0x1a*-0x10fcd+-0x536ac+0x59*-0x17db));const pluginsFolder=path[_0x2fc190(0xfd)](__dirname,_0x2fc190(0x10e));async function readFiles(_0xa2ab92){const _0x3472a9=_0x2fc190,_0x346fa9={'tJNdk':function(_0x1499ab,_0xcba5c0){return _0x1499ab(_0xcba5c0);},'WtDOh':_0x3472a9(0xfc),'uOpzp':function(_0x3cfab8,_0x508798,_0x368bb7){return _0x3cfab8(_0x508798,_0x368bb7);}},_0x4c436a=await fs[_0x3472a9(0xff)+'c'](_0xa2ab92);for(const _0x1c03c3 of _0x4c436a){const _0x21058e=await path[_0x3472a9(0xfd)](_0xa2ab92,_0x1c03c3),_0x24e5c5=await fs[_0x3472a9(0x10a)](_0x21058e);if(_0x24e5c5[_0x3472a9(0x10c)+'y']())await _0x346fa9[_0x3472a9(0xf6)](readFiles,_0x21058e);else{if(_0x24e5c5[_0x3472a9(0xfa)]()&&_0x1c03c3[_0x3472a9(0x109)](_0x346fa9[_0x3472a9(0x107)])){const _0x3fa11d=await _0x21058e,_0x1e5773=await import(_0x3fa11d);_0x346fa9[_0x3472a9(0x105)](nocache,_0x3fa11d,_0x1b4ee0=>console[_0x3472a9(0xf9)](chalk[_0x3472a9(0x101)+'t'](_0x3472a9(0x100)+_0x3472a9(0xf8))+time+chalk[_0x3472a9(0xfe)]('\x20\x22'+_0x1b4ee0+(_0x3472a9(0x102)+_0x3472a9(0xfb)))));}}}}function _0x20c9(){const _0x75788c=['WtDOh','7087232BZevoq','endsWith','statSync','51045150IBikHr','isDirector','190264Znfzul','../plugins','4426080MhuHcB','387vUCBji','4139298DABqqN','tJNdk','211538NxutwX','nt\x20MD\x20]\x20\x20','log','isFile','update!','.js','join','cyanBright','readdirSyn','[\x20Malefice','greenBrigh','\x22\x20Telah\x20di','7597475JZAvEn','7WNUkXt','uOpzp','7uBAnns'];_0x20c9=function(){return _0x75788c;};return _0x20c9();}readFiles(pluginsFolder);
import '../main.js'
nocache('../main.js', module =>
    console.log(chalk.greenBright('[ Maleficent MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import './helper.js'
nocache('./helper.js', module =>
    console.log(chalk.greenBright('[ Maleficent MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import 'maleficent-bot/pretty.js'
nocache('maleficent-bot/pretty.js', module =>
    console.log(chalk.greenBright('[ Maleficent MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);

import './sock.js'
nocache('./sock.js', module =>
    console.log(chalk.greenBright('[ Maleficent MD ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`))
);
