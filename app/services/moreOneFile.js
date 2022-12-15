// Description: This service is used to check if there is more than one file in a directory

const util = require('util')
const fs = require('fs');

module.exports = {
    moreOneFile: async (myArgs, env) => {
        const readdirPromise = util.promisify(fs.readdir)
        const files = await readdirPromise(`${env}/${myArgs}`)
        if (files.length > 1) {
            // Return an array of files
            return files
        }
        return files
    }
}