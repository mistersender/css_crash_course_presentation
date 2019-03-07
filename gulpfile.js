const gulp    = require('gulp')
const stylus      = require('gulp-stylus')
const sourcemaps  = require('gulp-sourcemaps')
const autoprefixer= require('gulp-autoprefixer')
const rename = require('gulp-rename')
const connect     = require('gulp-connect')

gulp.task('build', function(){
  return gulp.src(['./example/stylus/index.styl'])//, { base: './' })
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions', '> 5%', 'Android >= 4', 'Chrome >= 40', 'Explorer >= 10', 'iOS >= 7', ],
      cascade: false
    }))
    .pipe(rename(function (path) {
      path.dirname = `${path.dirname}/`;
      path.basename = "main";
      path.extname = ".css";
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./example'))
    .pipe(connect.reload());
});

gulp.task('serve', gulp.series('build', function (done) {
  connect.server({
    livereload: true,
    port: 8282,
    root: 'example',
  });
  done();
}));

gulp.task('watch', gulp.series('serve', function (done) {
  gulp.watch(['./example/stylus/**/*.styl'], gulp.series('build'));
  done();
}));
