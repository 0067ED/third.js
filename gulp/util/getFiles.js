var fs = require('fs');
var path = require('path');

function getFiles(dir) {
    if (!fs.statSync(dir).isDirectory()) {
        return [];
    }

    var filenames = fs.readdirSync(dir);
    filenames = filenames.map(function (filename) {
        return path.join(dir, filename);
    });

    return filenames.reduce(function (result, filepath, index) {
        if (!fs.statSync(filepath).isDirectory()) {
            if (path.extname(filepath) === '.js') {
                result.push(filepath);
            }
            return result;
        }

        return result.concat(getFiles(filepath));
    }, []);
}

module.exports = getFiles;
