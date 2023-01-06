// Description: Create folder for TVShows and Movies

const fs = require('fs');
const util = require('util')
const { env } = require('../../config')
const { exec } = require("child_process");
const { log } = require('../log/logger')

module.exports = {
    createFolder: async (folder, envFolder, torrentName, mode) => {
        const execPromise = util.promisify(exec)
        try {
            // Check if the folder exist
            log(`info: Check if the folder exist before create it`)
            if (!fs.existsSync(`${env[envFolder]}/${folder}`)) {
                // Create folder
                log(`info: Create folder`)
                mode = 'normal' ? await execPromise(`mkdir '${env[envFolder]}/${folder}'`) : log('test: Create folder OK')
            }
            else {
                log(`info: The folder already exist`)
            }
            if (envFolder === 'TVShows') {
                log(`info: Check if the season folder exist before create it`)
                // Check if the season folder exist
                if (!fs.existsSync(`${env[envFolder]}/${folder}/Season ${torrentName.season}`)) {
                    // Create season folder
                    log(`info: Create season folder`)
                    mode = 'normal' ? await execPromise(`mkdir '${env[envFolder]}/${folder}/Season ${torrentName.season}'`) : log('test: Create season folder OK')
                }
                else {
                    log(`info: The season folder already exist`)
                }
            }
        } catch (error) {
            log(`error when creating folder : ${error.message}`)
            return;
        }
    }
}