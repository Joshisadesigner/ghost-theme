var gulp            = require( 'gulp' ),
    sass            = require( 'gulp-sass' ),
    sourcemaps      = require( 'gulp-sourcemaps' ),
    useref          = require( 'gulp-useref' ),
    uglify          = require( 'gulp-uglify' ),
    gulpIf          = require( 'gulp-if' ),
    cssnano         = require( 'gulp-cssnano' ),
    imagemin        = require( 'gulp-imagemin' ),
    cache           = require( 'gulp-cache' ),
    del             = require( 'del' ),
    runSequence     = require( 'run-sequence' ),
    autoprefixer    = require( 'gulp-autoprefixer' ),
    browserSync     = require( 'browser-sync' ).create(),
    reload          = browserSync.reload;

// var config = { bootstrapDir: './bower_components/bootstrap-sass', };

gulp.task( 'sass', function() {
  return gulp.src( 'assets/sass/**/*.scss' )
    .pipe( sourcemaps.init() )
      .pipe( sass({
        outputStyle: 'expanded',
        // includePaths: [ config.bootstrapDir + '/assets/stylesheets/' ],
      }).on( 'error', sass.logError) )
      .pipe( autoprefixer() )
    .pipe( sourcemaps.write( './' ) )
    .pipe( gulp.dest( 'assets/css/'))
    .pipe( reload( { stream: true } ) );
});

gulp.task( 'browserSync', function() {

  var files = [ '**/*.hbs',
                '**/*.scss',
                '**/*.js',
                '**/*.{ jpg, png, gif }'
              ];

  browserSync.init( files, {
    proxy: "http://localhost:2368",
    notify: true
  });

});

gulp.task( 'watch', [ 'browserSync', 'sass' ], function() {
  gulp.watch( 'assets/sass/**/*.scss', ['sass'] );
  gulp.watch( 'assets/js/**/*.js', browserSync.reload );
  gulp.watch( '**/*.hbs', browserSync.reload );
});

gulp.task( 'useref', function() {
  return gulp.src( '**/*.hbs' )
    .pipe( useref() )
    .pipe( gulpIf( '**/*.js', uglify() ) )
    .pipe( gulpIf( '**/*.css', cssnano() ) )
    .pipe( gulp.dest( 'dist'))
});

gulp.task( 'files', function() {
  return gulp.src( [
      '!node_modules/**',
      '!bower_components/**',
      '!gulpfile.js',
      '**/*.hbs',
      '**/*.css',
      '**/*.js',
    ] )
    .pipe( gulpIf( '**/*.js', uglify() ) )
    .pipe( gulpIf( '**/*.css', cssnano() ) )
    .pipe( gulp.dest( 'dist'))
});

gulp.task( 'images', function() {
  return gulp.src( 'assets/images/**/*.+(png|jpg|gif|svg)' )
    .pipe( cache( imagemin() ) )
    .pipe( gulp.dest( 'dist/assets/images/' ) )
});

gulp.task( 'fonts', function () {
  return gulp.src( 'assets/fonts/**/*' )
    .pipe( gulp.dest( 'dist/assets/fonts/' ) )
});

gulp.task( 'cache:clear', function( callback ) {
  return cache.clearAll( callback )
});

gulp.task( 'clean:dist', function() {
  return del.sync( 'dist' );
});

gulp.task( 'default', function( callback ) {
  runSequence(
    [ 'sass', 'browserSync', 'watch' ],
    callback
  )
});

gulp.task( 'build', function( callback ) {
  console.log( 'Building files' );
  runSequence( 'clean:dist',
    [  'sass', 'files', 'images', 'fonts' ],
    callback
  )
});
