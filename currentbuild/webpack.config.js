var path = require('path');

module.exports = {
    entry: "./assets/scripts/scripts.js",
    output: {
        path: path.resolve(__dirname, "./compiledFiles/scripts"),
        filename: "scripts.js"
    }
}