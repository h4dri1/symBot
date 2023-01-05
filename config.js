// Description: This file contains the configuration for the application
// Use the .env file to configure the application

require('dotenv').config()

const TVShows = process.env.TVShowsFolder
const Movies = process.env.MoviesFolder
const Torrents = process.env.TorrentsFolder
const Music = process.env.MusicFolder

const env = {
    TVShows,
    Movies,
    Torrents,
    Music
}

module.exports = { env }