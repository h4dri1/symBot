const { isDir } = require('./isDir')
const { moreOneFile } = require('./moreOneFile')
const regExFilters = require('../filters/regEx')
const { env } = require('../../config')

module.exports = {
    checkType: async (myArgs, type) => {
        if (isDir(`${env.Torrents}/${myArgs}`)) {
            const files = await moreOneFile(myArgs, env.Torrents)
            if (files) {
                const format = files.find(file => file.match(regExFilters[type]));
                return { format: format.match(regExFilters[type])[1] };
            }
            return false      
        } else if (myArgs.match(regExFilters[type])) {
            return { format: myArgs.match(regExFilters[type])[1] }
        }
        return false
    }
}
