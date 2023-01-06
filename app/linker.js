// Description: Check if the torrent is a serie or a movie create the folder and create a symbolic link

const { makeFolder } = require('./modules/makeName')
const { createFolder } = require('./modules/createFolder')
const { symLink } = require('./modules/symLink')
const { log } = require('./log/logger')

module.exports = {
    linkTorrentMovies: async (torrentName, myArgs, mode) => {
    // Check if the torrent is a serie or a movie
        try {
            if (torrentName.media === 'tv') {
                // TVShow
                log('info: Finding TV Shows...')
                // Create folder
                log('info: Start creating folder...')
                await createFolder(makeFolder(torrentName), 'TVShows', torrentName, mode)
                // Create symbolic link
                log('info: Start creating symbolic link...')
                await symLink(myArgs, makeFolder(torrentName), 'TVShows', torrentName, mode)
                log('info: --------------------------------------------------------------- End of the process')
            }
            else {
                // Movie
                log('info: Finding Movie...')
                // Create folder
                log('info: Start creating folder...')
                await createFolder(makeFolder(torrentName), 'Movies', torrentName, mode)
                // Create symbolic link
                log('info: Start creating symbolic link...')
                await symLink(myArgs, makeFolder(torrentName), 'Movies', torrentName, mode)
            }
        } catch (error) {
            log(`error when linking torrent : ${error.message}`)
            return;
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