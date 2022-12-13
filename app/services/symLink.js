// Description: Create a symbolic link or copy all the folder and create symbolic link

const { exec } = require("child_process");
const util = require('util')
const { env } = require('../../config')

module.exports = {
    symLink: async (myArgs, folder, envFolder, torrentName) => {
        const execPromise = util.promisify(exec)
        const movieFileName = `${torrentName.name}${torrentName.format}`
        if (myArgs.slice(-4) === torrentName.format) {
            const showFileName = `Season ${torrentName.season}/${torrentName.name} - S${torrentName.season}E${torrentName.episode}${torrentName.format}`
            const file = envFolder === 'Movies' ? movieFileName : showFileName
            try {
                await execPromise(`ln -s '${env.Torrents}/${myArgs}' '${env[envFolder]}/${folder}/${file}'`)
                console.log(`Création du lien symbolique... \n`)
            } catch (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
        else {
            const file = envFolder === 'Movies' ? movieFileName : `Season ${torrentName.season}/`
            try {
                await execPromise(`cp -rs '${env.Torrents}/${myArgs}/'* '${env[envFolder]}/${folder}/${file}'`)
                console.log(`Copie du dossier... \n`)
            } catch (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
    }
}