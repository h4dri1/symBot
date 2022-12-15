// Description: Try to match the file name with the regular expression in argument
// search into the folder if it's a folder

const { isDir } = require('./isDir')
const { moreOneFile } = require('./moreOneFile')
const regExFilters = require('../filters/regEx')
const { env } = require('../../config')

module.exports = {
    checkType: async (myArgs, type) => {
        // If the torrent passed in argument is a folder
        if (isDir(`${env.Torrents}/${myArgs}`)) {
            // If the folder contains more than one file
            const files = await moreOneFile(myArgs, env.Torrents)
            if (files) {
                // Check if the file name match the regular expression
                const format = files.find(file => file.match(regExFilters[type]));
                // Return the string matching regex if it match
                return format?.match(regExFilters[type]);
            }
            return false      
        } else if (myArgs.match(regExFilters[type])) {
            // If the torrent passed in argument is a file
            // Check if the file name match the regular expression
            const exp = myArgs?.match(regExFilters[type])
            // Return the string matching regex if it match
            return exp
        }
        return false
    }
}

