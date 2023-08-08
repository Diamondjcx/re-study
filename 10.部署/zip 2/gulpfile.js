const gulp = require('gulp');
const cwd = process.cwd();
const path = require('path');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserify = require('gulp-bro');

function getProjectPath(...filepath) {
    return path.resolve(cwd, ...filepath);
}

function compile_to_browserify() {
    gulp.src([getProjectPath('3_gulp/src/index.js')])
    .pipe(babel({
        presets: [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "entry",
                    "corejs": 3,
                    "targets": {
                        "ie": "11"
                        // "esModule": true
                    }
                }
    
            ]
        ]
    }))
    .pipe(browserify({
        basedir:'/',
        plugin: [
            [require('esmify')]
        ]
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('3_gulp/dist'))
}

function compile_to_es5() {
    gulp.src([getProjectPath('3_gulp/src/**/*.js')])
    .pipe(babel({
        presets: [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "entry",
                    "corejs": 3,
                    "targets": {
                        "ie": "11"
                        // "esModule": true
                    }
                }
    
            ]
        ]
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('3_gulp/dist'))
}

gulp.task(
    'compile-to-browserify', done => {
        compile_to_browserify();
        done();
    }
);

gulp.task(
    'compile-to-es5', done => {
        compile_to_es5();
        done();
    }
);

gulp.task(
    'compile',
    gulp.series('compile-to-es5', 'compile-to-browserify')
);


