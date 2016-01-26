var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel');

var esSrc = [
  './public/js/react/react.js',
  './public/js/react/react-dom.js',
  './public/js/simplePubSub.js',
  './public/js/d3Model.js',
  './public/js/d3Controller.js',

  './public/js/D3ItemChanceStats.jsx',
  './public/js/D3ItemExpanded.jsx',
  './public/js/D3Item.jsx',
  './public/js/D3Rows.jsx',
  './public/js/D3Controls.jsx',
  './public/js/D3.jsx'
]

gulp.task('stylus', function () {
  gulp.src('./public/css/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  gulp.src(esSrc)
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('d3app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
})

gulp.task('watch', function() {
  gulp.watch(['./public/css/*.styl','./public/css/**/*.styl'] , ['stylus']);
  gulp.watch(esSrc, ['scripts']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'stylus',
  'scripts',
  'develop',
  'watch'
]);
