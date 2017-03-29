// This script parses the output of the following youtube-dl command into a json file
// sudo pip install --upgrade youtube_dl
// youtube-dl --get-id PLAEQD0ULngi67rwmhrkNjMZKvyCReqDV4 -i > bobross.txt

// Requires npm install line-by-line
// Run node parse-playlist-urls.js > bobross.json
// Don't forget to manually remove the last comma in the array

let lbl = require('line-by-line')
lr = new lbl('bobross.txt')

console.log('{ \n   "videos":\n    [')

lr.on('line', line => {
    console.log(`        "${line}",`)
})

lr.on('end', () => {
    console.log("    ]\n}")
})
