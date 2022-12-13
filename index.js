// Description: Extract torrent name and create a symbolic link to the media folder
// Author: @h4dri1
// Date: 2022-12-12
// Version: 0.1.0

// Torrent name argument
const myArgs = process.argv.slice(2);

const regExFilters = require('./app/filters/regEx')
const { clean } = require('./app/cleaners/clean')
const { linkTorrent } = require('./app/linkers/link')

// Extract torrent name
// Use regex to extract season, episode and year
const format = myArgs[0].match(regExFilters.formatRegEx);

if (format[0].match(regExFilters.formatMoviesRegEx)) {
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
        format: format ? `.${format[1]}` : null
    })

    // Create symbolic link
    linkTorrent(torrentName, myArgs[0]);
}



