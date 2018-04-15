var path = require('path');

module.exports = {
    entry: "./site/assets/scripts/scripts.js",
    output: {
        path: path.resolve(__dirname, "./site/compiledFiles/scripts"),
        filename: "scripts.js"
    }
}