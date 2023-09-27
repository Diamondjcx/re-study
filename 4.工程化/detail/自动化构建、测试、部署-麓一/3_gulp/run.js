const gulp = require('gulp');

function runTask() {
    const taskInstance = gulp.task('compile');
    taskInstance.apply(gulp);
}

require('../gulpfile.js');

runTask();

