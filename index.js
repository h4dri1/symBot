// Description: Extract torrent name and create a symbolic link to the media folder
// Author: @h4dri1
// Date: 2022-12-12
// Version: 0.1.0

// Torrent name argument
const myArgs = process.argv.slice(2);

const regExFilters = require('./app/filters/regEx')
const { clean } = require('./app/cleaners/clean')
const { linkTorrentMovies, linkTorrentMusic } = require('./app/linkers/link')
const { checkType } = require('./app/services/checkType')

// Extract torrent name
// Use regex to extract season, episode and year
async function ext() {
    const type = await checkType(myArgs[0], 'formatRegEx');
    return type
}

async function main() {
    const { format } = await ext();
    const checkFormat = `.${format}`
    if (checkFormat.match(regExFilters.formatMoviesRegEx)) {
        const season = myArgs[0].match(regExFilters.saisonRegEx);
        const episode = myArgs[0].match(regExFilters.episodeRegEx);
        const year = myArgs[0].match(regExFilters.yearRegEx);
        const nameTorrent = myArgs[0].match(regExFilters.nameRegEx);

        // Clean torrent name
        const torrentName =  clean({ 
            name: nameTorrent ? nameTorrent[1] : myArgs[0], 
            season: season ? season[1] : null,
            episode: episode ? episode[1] : null, 
            year: year ? year[0] : null,
            format: format ? checkFormat : null
        })

        // Create symbolic link
        linkTorrentMovies(torrentName, myArgs[0]);
    } else if (checkFormat.match(regExFilters.formatMusicRegEx)) {
        const year = myArgs[0].match(regExFilters.yearRegEx);
        const nameTorrent = myArgs[0].match(regExFilters.nameRegEx);

        // Clean torrent name
        const torrentName =  clean({
            name: nameTorrent ? nameTorrent[1] : myArgs[0],
            year: year ? year[0] : null,
            format: format ? checkFormat : null
        })

        // Create symbolic link
        linkTorrentMusic(torrentName, myArgs[0]);
    }
}

main();

