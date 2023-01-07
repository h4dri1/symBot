// Description: Create a symbolic link or copy all the folder and create symbolic link
const fs = require('fs');
const { exec } = require("child_process");
const util = require('util')
const { env } = require('../../config');
const regExFilters = require("../filters/regEx");
const { moreOneFile } = require("../services/moreOneFile");
const { log } = require("../log/logger");

module.exports = {
    symLink: async (myArgs, folder, envFolder, torrentName, mode) => {
        const execPromise = util.promisify(exec)
        // Check if the torrent is a folder
        log(`info: Check if the torrent is a folder`)
        if (myArgs.slice(-4) === torrentName.format) {
            // Create the file name
            log('info: the torrent is a file')
            log(`info: Create the file name`)
            const showFileName = `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${torrentName.episode}${torrentName.format}`
            // Create variable filename for movies or tvshows
            const file = envFolder === 'Movies' ? `${torrentName.name}${torrentName.format}` : showFileName
            try {
                // Create symbolic link
                const isExist = fs.existsSync(`${env[envFolder]}/${folder}/${file}`)
                if (!isExist) {
                    log(`info: Create symbolic link`)
                    mode = 'normal' ? await execPromise(`ln -s '${env.Torrents}/${myArgs}' '${env[envFolder]}/${folder}/${file}'`) : log('test: Create symbolic link OK')
                } else {
                    log(`info: The symbolic link already exist`)
                    return
                }
            } catch (error) {
                log(`error when creating symbolic link : ${error.message}`)
                return;
            }
        }
        else {
            // If the torrent is a folder
            // Get all the files in the folder
            log(`info: the torrent is a folder`)
            log(`info: Get all the files in the folder`)
            const files = await moreOneFile(myArgs, env.Torrents)
            try {
                // Create symbolic link for each file
                log(`info: Create symbolic link for each file`)
                files.forEach(async file => {
                    // Create the file name
                    const showFileName = () => `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${file.match(regExFilters.episodeRegEx)[2]}${file.slice(-4)}`
                    // Create variable filename for movies or tvshows
                    const fileName = envFolder === 'Movies' ? `${torrentName.name}${file.slice(-4)}` : showFileName()
                    if (!fs.existsSync(`${env[envFolder]}/${folder}/${fileName}`)) {
                        mode = 'normal' ? await execPromise(`ln -s '${env.Torrents}/${myArgs}/${file}' '${env[envFolder]}/${folder}/${fileName}'`) : log('test: Create symbolic link OK')
                        log(`info: Create symbolic link`)
                    } else {
                        log(`info: The symbolic link already exist`)
                    }
                })
                //add cover picture
                if (torrentName.cover && envFolder === 'Movies' && !fs.existsSync(`${env[envFolder]}/${folder}/cover.jpg`)) {
                    log(`info: add cover picture`)
                    mode = 'normal' ? await execPromise(`wget -O '${env[envFolder]}/${folder}/cover.jpg' '${torrentName.cover}'`) : log('test: add cover picture OK')
                }
                else if (torrentName.cover && envFolder === 'TVShows' && !fs.existsSync(`${env[envFolder]}/${folder}/Season ${torrentName.season}/cover.jpg`)) {
                    log(`info: add cover picture`)
                    mode = 'normal' ? await execPromise(`wget -O '${env[envFolder]}/${folder}/Season ${torrentName.season}/cover.jpg' '${torrentName.cover}'`) : log('test: add cover picture OK')
                }
            } catch (error) {
                log(`error when creating symbolic link : ${error.message}`)
                return;
            }
        }
    }
}