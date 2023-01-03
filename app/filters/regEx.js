// Description: This file contains all the regular expressions used in the app

const regExFilters = {
    saisonRegEx: /([Ss]([0-9]{2}))/,
    episodeRegEx: /([Eex]([0-9]{2})(?:[^0-9]|$))/,
    yearRegEx: /[\[\(]?(19|20)\d{2}[\)\]]?/,
    nameRegEx: /(.+?)(?=[\[\(]?(19|20)\d{2}[\)\]]?|[Ss]?([0-9]{1,2})|\[[^\]]+\])/gm,
    formatRegEx: /^.*\.(avi|mp4|mkv|flv|mov|wmv|mpg|mpeg|mp3|m4a|ogg|flac|wav|aiff|alac|nfo|srt|sub|vtt|ass|ssa|txt)$/,
    formatMoviesRegEx: /^.*\.(avi|mp4|mkv|flv|mov|wmv|mpg|mpeg)$/,
    formatMusicRegEx: /^.*\.(mp3|m4a|ogg|flac|wav|aiff|alac)$/,
    formatSubRegEx: /^.*\.(srt|sub|idx|ass|ssa|txt)$/,
}

module.exports = regExFilters
