const { isDir } = require('./isDir')
const { moreOneFile } = require('./moreOneFile')
const regExFilters = require('../filters/regEx')

module.exports = {
    isTVShow: async (myArgs, env) => {
        if (isDir(`${env}/${myArgs}`)) {
            const files = await moreOneFile(myArgs, env)
            if (files) {
                const episode = files.find(file => file.match(regExFilters.saisonRegEx));
                if (!episode) {
                    return false
                }
                return { season: episode.match(regExFilters.saisonRegEx)[2] };
            }
            return false      
        } else if (myArgs.match(regExFilters.saisonRegEx)) {
            return { season: myArgs.match(regExFilters.saisonRegEx)[2] }
        }
        return false
    }
}
