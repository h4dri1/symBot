const fs = require('fs');

module.exports = {
    isDir: (path) => {
        try {
            var stat = fs.lstatSync(path);
            return stat.isDirectory();
        } catch (e) {
            // lstatSync throws an error if path doesn't exist
            return false;
        }
    }
}