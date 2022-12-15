// Description: Create a symbolic link or copy all the folder and create symbolic link

const { exec } = require("child_process");
const util = require('util')
const { env } = require('../../config');
const regExFilters = require("../filters/regEx");
const { moreOneFile } = require("../services/moreOneFile");

module.exports = {
    symLink: async (myArgs, folder, envFolder, torrentName) => {
        const execPromise = util.promisify(exec)
        // Check if the torrent is a folder
        if (myArgs.slice(-4) === torrentName.format) {
            // Create the file name
            const showFileName = `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${torrentName.episode}${torrentName.format}`
            // Create variable filename for movies or tvshows
            const file = envFolder === 'Movies' ? `${torrentName.name}${torrentName.format}` : showFileName
            try {
                // Create symbolic link
                await execPromise(`ln -s '${env.Torrents}/${myArgs}' '${env[envFolder]}/${folder}/${file}'`)
                console.log(`Création du lien symbolique... \n`)
            } catch (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
        else {
            // If the torrent is a folder
            // Get all the files in the folder
            const files = await moreOneFile(myArgs, env.Torrents)
            try {
                // Create symbolic link for each file
                files.forEach(async file => {
                    // Create the file name
                    const showFileName = () => `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${file.match(regExFilters.episodeRegEx)[2]}${file.slice(-4)}`
                    // Create variable filename for movies or tvshows
                    const fileName = envFolder === 'Movies' ? `${torrentName.name}${file.slice(-4)}` : showFileName()
                    await execPromise(`ln -s '${env.Torrents}/${myArgs}/${file}' '${env[envFolder]}/${folder}/${fileName}'`)
                    console.log(`Création du lien symbolique... \n`)
                })
                //add cover picture
                if (torrentName.cover && envFolder === 'Movies') {
                    await execPromise(`wget -O '${env[envFolder]}/${folder}/cover.jpg' '${torrentName.cover}'`)
                }
                else if (torrentName.cover && envFolder === 'TVShows') {
                    await execPromise(`wget -O '${env[envFolder]}/${folder}/Season ${torrentName.season}/cover.jpg' '${torrentName.cover}'`)
                }
            } catch (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
    }
}