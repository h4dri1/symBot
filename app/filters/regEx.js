// Description: This file contains all the regular expressions used in the app

const regExFilters = {
    saisonRegEx: /([Ss]([0-9]{2}))/,
    episodeRegEx: /([Eex]([0-9]{2})(?:[^0-9]|$))/,
    yearRegEx: /[\[\(]?(19|20)\d{2}[\)\]]?/,
    nameRegEx: /(.+?)(?=[\[\(]?(19|20)\d{2}[\)\]]?|[Ss]?([0-9]{1,2}))/
}

module.exports = regExFilters