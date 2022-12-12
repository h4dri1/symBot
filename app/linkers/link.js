// Description: Check if the torrent is a serie or a movie create the folder and create a symbolic link

const { generateFolder } = require('../utils/generateFolder')
const { createFolder } = require('../utils/createFolder')
const { symLink } = require('../utils/symLink')

async function linkTorrent(torrentName, myArgs) {
    // Generate folder name
    const folder = generateFolder(torrentName)
    // Check if the torrent is a serie or a movie
    if (torrentName.season) {
        // TVShow
        console.log('Serie trouvée ajout en court...')
        // Create folder
        await createFolder(folder, 'TVShows', torrentName)
        // Create symbolic link
        await symLink(myArgs, folder, 'TVShows', torrentName)
    }
    else {
        // Movie
        console.log('Film trouvé ajout en court...')
        // Create folder
        await createFolder(folder, 'Movies', torrentName)
        // Create symbolic link
        await symLink(myArgs, folder, 'Movies', torrentName)
    }
}

module.exports = { linkTorrent }