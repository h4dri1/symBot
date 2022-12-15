// Description: Create a symbolic link or copy all the folder and create symbolic link

const { exec } = require("child_process");
const util = require('util')
const { env } = require('../../config');
const regExFilters = require("../filters/regEx");
const { moreOneFile } = require("./moreOneFile");

module.exports = {
    symLink: async (myArgs, folder, envFolder, torrentName) => {
        const execPromise = util.promisify(exec)
        if (myArgs.slice(-4) === torrentName.format) {
            const showFileName = `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${torrentName.episode}${torrentName.format}`
            const file = envFolder === 'Movies' ? `${torrentName.name}${torrentName.format}` : showFileName
            try {
                await execPromise(`ln -s '${env.Torrents}/${myArgs}' '${env[envFolder]}/${folder}/${file}'`)
                console.log(`Création du lien symbolique... \n`)
            } catch (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
        else {
            const files = await moreOneFile(myArgs, env.Torrents)
            try {
                files.forEach(async file => {
                    const showFileName = `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${file.match(regExFilters.episodeRegEx)[2]}${file.slice(-4)}`
                    const fileName = envFolder === 'Movies' ? `${torrentName.name}${file.slice(-4)}` : showFileName
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