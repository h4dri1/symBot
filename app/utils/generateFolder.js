// Description: Generate folder name for torrent
// Some torrent name use the year in the name

module.exports = {
    generateFolder: (torrentName) => {
        if (torrentName.year) {
            return `${torrentName.name} (${torrentName.year})`
        }
        return torrentName.name
    }
}