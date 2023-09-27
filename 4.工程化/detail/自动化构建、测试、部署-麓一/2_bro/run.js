const browserify = require('browserify');
const babelify = require('babelify');
const fs = require('fs');

browserify('./2_bro/src/index.js', {
    basedir: './',
    transform: [['babelify', {presets: ['@babel/preset-env']}]],
    paths: ['src']
})
.bundle()
.pipe(fs.createWriteStream('./2_bro/dist/bundle2.js'))