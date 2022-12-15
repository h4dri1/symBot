// Description: Create folder for TVShows and Movies

const fs = require('fs');
const util = require('util')
const { env } = require('../../config')
const { exec } = require("child_process");

module.exports = {
    createFolder: async (folder, envFolder, torrentName) => {
        const execPromise = util.promisify(exec)
        try {
            // Check if the folder exist
            if (!fs.existsSync(`${env[envFolder]}/${folder}`)) {
                // Create folder
                await execPromise(`mkdir '${env[envFolder]}/${folder}'`)
                console.log(`Création du dossier de ${envFolder}... \n`)
            }
            else {
                console.log(`Le répertoire de ${torrentName.name} existe déjà... \n`)
            }
            if (envFolder === 'TVShows') {
                // Check if the season folder exist
                if (!fs.existsSync(`${env[envFolder]}/${folder}/Season ${torrentName.season}`)) {
                    // Create season folder
                    await execPromise(`mkdir '${env[envFolder]}/${folder}/Season ${torrentName.season}'`)
                    console.log(`Création du dossier de saison... \n`)
                }
                else {
                    console.log(`Le répertoire de saison existe déjà... \n`)
                }
            }
        } catch (error) {
            console.log(`error: ${error.message}`);
            return;
        }
    }
}