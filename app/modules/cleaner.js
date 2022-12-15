// Description: Clean the torrent name
// Clean the torrent name by removing special characters, spaces and other characters

module.exports = {
    clean: (torrent) => {
        const { name, season, episode, year, format } = torrent

        const cleanName = name.replace(/[\.\-\_]/g, ' ');
        const cleanSeason = () => season.replace(/[Ss.]/g, '');
        const cleanEpisode = () => episode.replace(/[Eex.]/g, '');
        const cleanYear = () => year.replace(/[\[\]\(\)]/g, '');
        const cleanFormat = () => format.replace(/[\[\]\(\)]/g, '');

        const torrentName = {
            name: cleanName.trim(),
            year: year  ? cleanYear().trim() : null,
            season: season ? cleanSeason().trim() : null,
            episode: episode ? cleanEpisode().trim() : null,
            format: format ? cleanFormat().trim() : null
        }

        return torrentName
    }
}