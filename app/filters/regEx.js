// Description: This file contains all the regular expressions used in the app

const regExFilters = {
    saisonRegEx: /([Ss]([0-9]{2}))/,
    episodeRegEx: /([Eex]([0-9]{2})(?:[^0-9]|$))/,
    yearRegEx: /[\[\(]?(19|20)\d{2}[\)\]]?/,
    nameRegEx: /(.+?)(?=[\[\(]?(19|20)\d{2}[\)\]]?|[Ss]?([0-9]{1,2}))/,
    formatRegEx: /^.*\.(avi|mp4|mkv|flv|mov|wmv|mpg|mpeg|mp3|m4a|ogg|flac|wav|aiff|alac|zip|rar|7z|tar|gz|jpeg|jpg|png|gif|bmp|iso|img|bin|nfo|srt|exe|msi|dmg|app)$/
}

module.exports = regExFilters