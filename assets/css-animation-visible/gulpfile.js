var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    return gulp.src('jquery.animateVisible.js')
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(uglify()).on('error', function(error) {
            gutil.log(error.toString());
            this.emit('end')
        })
        .pipe(gulp.dest('.'))
});

gulp.task('watch', gulp.series(['default'], function() {
    gulp.watch('jquery.animateVisible.js', ['default']);
}));
