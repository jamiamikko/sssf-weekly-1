const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
    gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', () => {
    gulp.watch('./assets/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
