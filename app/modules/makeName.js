// Description: Make torrent name

const { checkType } = require('../services/checkType');
const { clean } = require('./cleaner');
const { fetchInfo } = require('../services/fetchData');
const { log } = require('../log/logger');

async function checkRegX(regExSearch, myArgs) {
    const type = await checkType(myArgs, regExSearch);
    return type
}

module.exports = {
    // Make torrent name
    makeMovieName: async function (fileType, myArgs) {
        try {
            // Check all regular expression against the torrent name
            log('info: Check all regular expression against the torrent name')
            const season = await checkRegX('saisonRegEx', myArgs);
            const episode = await checkRegX('episodeRegEx', myArgs);
            const year = await checkRegX('yearRegEx', myArgs);
            const nameTorrent = await checkRegX('nameRegEx', myArgs);

            // Clean torrent name
            log('info: Clean torrent name')
            const torrentInfo =  clean({
                name: nameTorrent ? nameTorrent[0] : myArgs, 
                season: season ? season[1] : null,
                episode: episode ? episode[1] : null, 
                year: year ? year[0] : null,
                format: fileType ? fileType : null
            })
            console.log(torrentInfo)

            // Call api to get info
            log('info: Call api to get info')
            const mediaInfo = await fetchInfo(torrentInfo);

            // Make torrent name
            log('info: Make torrent name')
            const torrentName = {
                ...torrentInfo,
                name: mediaInfo.results[0].name ? mediaInfo.results[0].name : mediaInfo.results[0].original_title,
                year: mediaInfo.results[0].first_air_date ? mediaInfo.results[0].first_air_date.split('-')[0] : mediaInfo.results[0].release_date.split('-')[0],
                cover: mediaInfo.results[0].poster_path ? `https://image.tmdb.org/t/p/w500${mediaInfo.results[0].poster_path}` : null,
                media: season ? 'tv' : 'movie'
            }

            return torrentName;
        } catch (error) {
            log(`error when making media name : ${error}`)
        }
       
    },

    // Make folder name
    makeFolder: (torrentName) => {
        log('info: Make folder name')
        if (torrentName.year) {
            return `${torrentName.name} (${torrentName.year})`
        }
        return torrentName.name
    }
}