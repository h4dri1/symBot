const tmdbBaseUrl = 'https://api.themoviedb.org/3/search';

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetchInfo: async (torrentInfo) => {
        // Call api to get info
        if (torrentInfo.season) {
            const tvShowsReq = `language=fr-FR&query=${torrentInfo.name}&page=1&include_adult=false`;
            const mediaInfo = await fetchData(`${tmdbBaseUrl}/tv?api_key=${process.env.APIKey}&${tvShowsReq}`)
            return mediaInfo;
        } else {
            const moviesReq = `language=fr-FR&query=${torrentInfo.name}&page=1&include_adult=false${torrentInfo.year ? `&year=${torrentInfo.year}` : ''}`;
            const mediaInfo = await fetchData(`${tmdbBaseUrl}/movie?api_key=${process.env.APIKey}&${moviesReq}`)
            return mediaInfo;
        }
    }
}