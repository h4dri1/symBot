// Description: Extract torrent name and create a symbolic link to the media folder
// Author: @h4dri1
// Date: 2022-12-12
// Version: 0.1.0

// Torrent name argument
let myArgs = process.argv.slice(2);

if (myArgs === "--test") {
    myArgs = process.argv.slice(3);
}

const regExFilters = require('./app/filters/regEx')
const { clean } = require('./app/modules/cleaner')
const { linkTorrentMovies, linkTorrentMusic } = require('./app/linker')
const { checkType } = require('./app/services/checkType');
const { makeMovieName } = require('./app/modules/makeName');
const { log } = require('./app/log/logger');

// Check the file extension
// Search for the file extension in folder or in the torrent name
async function checkRegX(regExSearch) {
    const type = await checkType(myArgs[0], regExSearch);
    return `.${type[1]}`
}

async function main() {
    // Check if the torrent is a serie or a music
    const fileType = await checkRegX('formatRegEx');
    const isMovieMedia = fileType.match(regExFilters.formatMoviesRegEx)
    const isMusicMedia = fileType.match(regExFilters.formatMusicRegEx)
    // If the torrent is a serie or a movie
    if (isMovieMedia) {
        // make torrent name
        const torrentName = await makeMovieName(fileType, myArgs[0]);

        // Create symbolic link
        linkTorrentMovies(torrentName, myArgs[0]);
    } else if (isMusicMedia) {
        //Need to be refactored and optimized
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
    } else {
        log('error: This torrent is not a movie or a serie')
        console.log('This torrent is not a movie or a serie')
        return
    }
}

main();

