const util = require('util')
const fs = require('fs');

module.exports = {
    moreOneFile: async (myArgs, env) => {
        const readdirPromise = util.promisify(fs.readdir)
        const files = await readdirPromise(`${env}/${myArgs}`)
        if (files.length > 1) {
            console.log('Plusieurs fichiers trouvés')
            return files
        }
        return files
    }
}