// Description: Check if the torrent is a serie or a movie create the folder and create a symbolic link

const { makeFolder } = require('./modules/makeName')
const { createFolder } = require('./modules/createFolder')
const { symLink } = require('./modules/symLink')

module.exports = {
    linkTorrentMovies: async (torrentName, myArgs) => {
    // Check if the torrent is a serie or a movie
        try {
            if (torrentName.media === 'tv') {
                // TVShow
                log('info: Finding TV Show adding...')
                console.log('Serie trouvée ajout en court...')
                // Create folder
                log('info: Creating folder...')
                await createFolder(makeFolder(torrentName), 'TVShows', torrentName)
                // Create symbolic link
                log('info: Creating symbolic link...')
                await symLink(myArgs, makeFolder(torrentName), 'TVShows', torrentName)
            }
            else {
                // Movie
                log('info: Finding Movie adding...')
                console.log('Film trouvé ajout en court...')
                // Create folder
                log('info: Creating folder...')
                await createFolder(makeFolder(torrentName), 'Movies', torrentName)
                // Create symbolic link
                log('info: Creating symbolic link...')
                await symLink(myArgs, makeFolder(torrentName), 'Movies', torrentName)
            }
        } catch (error) {
            log(`error: Link torrent`)
            console.log(`error: ${error.message}`);
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