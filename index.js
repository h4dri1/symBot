// Description: Extract torrent name and create a symbolic link to the media folder
// Author: @h4dri1
// Date: 2022-12-12
// Version: 0.1.0

// Torrent name argument
const myArgs = process.argv.slice(2);

const regExFilters = require('./app/filters/regEx')
const { clean } = require('./app/cleaners/clean')
const { linkTorrentMovies, linkTorrentMusic } = require('./app/linkers/link')
const { checkType } = require('./app/services/checkType');
const { fetchData } = require('./app/services/fetch');

// Extract torrent name
// Use regex to extract season, episode and year
async function ext(regExSearch) {
    const type = await checkType(myArgs[0], regExSearch);
    return type
}

async function main() {
    const format = await ext('formatRegEx');
    const checkFormat = `.${format[1]}`
    if (checkFormat.match(regExFilters.formatMoviesRegEx)) {
        const season = await ext('saisonRegEx');
        const episode = await ext('episodeRegEx');
        const year = await ext('yearRegEx');
        const nameTorrent = await ext('nameRegEx');

        // Clean torrent name
        const torrentInfo =  clean({ 
            name: nameTorrent ? nameTorrent[1] : myArgs[0], 
            season: season ? season[1] : null,
            episode: episode ? episode[1] : null, 
            year: year ? year[0] : null,
            format: format ? checkFormat : null
        })

        let mediaInfo = null;
        // Call api to get info
        if (torrentInfo.season) {
            mediaInfo = await fetchData(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.APIKey}&language=fr-FR&query=${torrentInfo.name}&page=1&include_adult=false`)
        } else {
            mediaInfo = await fetchData(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKey}&language=fr-FR&query=${torrentInfo.name}&page=1&include_adult=false${torrentInfo.year ? `&year=${torrentInfo.year}` : ''}`)
        }

        const torrentName = {
            ...torrentInfo,
            name: mediaInfo.results[0].name ? mediaInfo.results[0].name : mediaInfo.results[0].original_title,
            year: mediaInfo.results[0].first_air_date ? mediaInfo.results[0].first_air_date.split('-')[0] : mediaInfo.results[0].release_date.split('-')[0],
            cover: mediaInfo.results[0].poster_path ? `https://image.tmdb.org/t/p/w500${mediaInfo.results[0].poster_path}` : null
        }

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

