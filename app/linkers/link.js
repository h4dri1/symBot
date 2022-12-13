// Description: Check if the torrent is a serie or a movie create the folder and create a symbolic link

const { generateFolder } = require('../services/generateFolder')
const { createFolder } = require('../services/createFolder')
const { symLink } = require('../services/symLink')
const { isTVShow } = require('../services/isTVShow')
const { env } = require('../../config')

async function linkTorrent(torrentName, myArgs) {
    // Check if the torrent is a serie or a movie
    const TVShow = await isTVShow(myArgs, env.Torrents)
    if (TVShow) {
        // TVShow
        console.log('Serie trouvée ajout en court...')
        // Create folder
        const newTorrentName = { ...torrentName, season: TVShow }
        await createFolder(generateFolder(newTorrentName), 'TVShows', newTorrentName)
        // Create symbolic link
        await symLink(myArgs, generateFolder(newTorrentName), 'TVShows', newTorrentName)
    }
    else {
        // Movie
        console.log('Film trouvé ajout en court...')
        // Create folder
        await createFolder(generateFolder(torrentName), 'Movies', torrentName)
        // Create symbolic link
        await symLink(myArgs, generateFolder(torrentName), 'Movies', torrentName)
    }
}

module.exports = { linkTorrent }