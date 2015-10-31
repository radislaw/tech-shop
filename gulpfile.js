/* --------- plugins --------- */

var
    gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    jade        = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber');

/* --------- paths --------- */

var
    paths = {
        jade : {
            location    : 'components/jade/**/*.jade',
            compiled    : 'components/jade/*.jade',
            destination : 'build/development'
        },

        scss : {
            location    : 'components/scss/**/*.scss',
            entryPoint  : 'build/development/css/main.css'
        },

        compass : {
            configFile  : 'config.rb',
            cssFolder   : 'build/development/css',
            scssFolder  : 'components/scss',
            imgFolder   : 'build/development/img'
        },

        browserSync : {
            baseDir : 'build/development/',
            watchPaths : ['*.html', 'css/*.css', 'js/*.js']
        }
    };

/* --------- jade --------- */
gulp.task('jade', function(){
    gulp.src(paths.jade.compiled)
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.jade.destination))
});

/* --------- scss-compass --------- */

gulp.task('compass', function() {
    gulp.src(paths.scss.location)
        .pipe(plumber())
        .pipe(compass({
            config_file: paths.compass.configFile,
            css: paths.compass.cssFolder,
            sass: paths.compass.scssFolder,
            image: paths.compass.imgFolder
        }));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
    browserSync.init({
        notify: false,
        port: 3000,
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});


/* --------- watch --------- */

gulp.task("watch", function () {
    gulp.watch(paths.jade.location, ['jade']);
    gulp.watch(paths.scss.location, ['compass']);
    gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
    gulp.watch([
        "build/development/*.html",
        "build/development/css/*.css",
        "build/development/js/*.js"
    ]).on("change", browserSync.reload);
});
/* --------- default --------- */

gulp.task('default', ['jade', 'compass', 'sync', 'watch']);