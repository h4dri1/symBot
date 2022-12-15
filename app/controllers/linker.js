// Description: Check if the torrent is a serie or a movie create the folder and create a symbolic link

const { makeFolder } = require('../modules/makeName')
const { createFolder } = require('../modules/createFolder')
const { symLink } = require('../modules/symLink')

module.exports = {
    linkTorrentMovies: async (torrentName, myArgs) => {
    // Check if the torrent is a serie or a movie
        if (torrentName.media === 'tv') {
            // TVShow
            console.log('Serie trouvée ajout en court...')
            // Create folder
            await createFolder(makeFolder(torrentName), 'TVShows', torrentName)
            // Create symbolic link
            await symLink(myArgs, makeFolder(torrentName), 'TVShows', torrentName)
        }
        else {
            // Movie
            console.log('Film trouvé ajout en court...')
            // Create folder
            await createFolder(makeFolder(torrentName), 'Movies', torrentName)
            // Create symbolic link
            await symLink(myArgs, makeFolder(torrentName), 'Movies', torrentName)
        }
    },

    linkTorrentMusic: async (torrentName, myArgs) => {
        console.log('Musique trouvée ajout en court...')
        // Create folder
        await createFolder(makeFolder(torrentName), 'Music', torrentName)
        // Create symbolic link
        await symLink(myArgs, makeFolder(torrentName), 'Music', torrentName)
    }
}