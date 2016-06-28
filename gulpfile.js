var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  bowerFiles = require('main-bower-files'),
  concat = require('gulp-concat-sourcemap'),
  del = require('del'),
  runSequence = require('run-sequence'),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  karmaServer = require('karma').Server,
  paths = {
    assets: 'src/assets/**/*',
    less: 'src/css/main.less',
    index: 'src/index.html',
    ts: 'src/scripts/**/*.ts',
    spec: 'src/tests/**/*.spec.ts',
    build: 'build',
    dist: 'dist'
  },
  tsProject = $.typescript.createProject('tsconfig.json'),
  specProject = $.typescript.createProject('tsconfig.spec.json');


// the default DEV task sequence
gulp.task('default', function () {
  runSequence('clean', ['inject', 'typescript', 'less', 'connect', 'watch'], 'open');
});

// the build task that sequence before packing the electron app
gulp.task('build', function () {
  return runSequence('clean', ['copy', 'minifyJs', 'minifyCss', 'processhtml']);
});


gulp.task('typescript', function () {
  var tsResult = gulp.src([paths.ts])
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject));

  return tsResult.js
    .pipe(concat('main.js'))
    //.pipe($.sourcemaps.write(paths.build))
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function (cb) {
  return del([paths.build, paths.dist], cb);
});

gulp.task('clean-test', function (cb) {
  return del([paths.dist], cb);
});

gulp.task('copy', function () {
  gulp.src('./src/app.js')
    .pipe(gulp.dest(paths.dist));

  gulp.src('./src/package.json')
    .pipe(gulp.dest(paths.dist));

  gulp.src('./src/config.json')
    .pipe(gulp.dest(paths.dist));

  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + '/assets'));
});

gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe($.less())
    .pipe(gulp.dest(paths.build));
});

gulp.task('processhtml', function () {
  return gulp.src(paths.index)
    .pipe($.processhtml())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('inject', function () {
  return gulp.src(paths.index)
    .pipe($.inject(gulp.src(bowerFiles()), { name: 'bower', relative: true }))
    .pipe(gulp.dest('src'));
});

gulp.task('reload', ['typescript'], function () {
  gulp.src(paths.index)
    .pipe($.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(paths.ts, ['typescript', 'reload']);
  gulp.watch(paths.less, ['less', 'reload']);
  gulp.watch(paths.index, ['reload']);
});

gulp.task('connect', function () {
  $.connect.server({
    root: [__dirname + '/src', paths.build],
    port: 9000,
    livereload: true
  });
});

gulp.task('open', function () {
  gulp.src(paths.index)
    .pipe($.open({ uri: 'http://localhost:9000' }));
});

gulp.task('minifyJs', ['typescript'], function () {
  var all = bowerFiles().concat(paths.build + '/main.js');
  return gulp.src(all)
    .pipe($.uglifyjs('all.min.js', { outSourceMap: false }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifyCss', ['less'], function () {
  return gulp.src(paths.build + '/main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('build-source', function () {
  return specProject.src()
    .pipe($.sourcemaps.init())
    .pipe($.typescript(specProject))
    .pipe($.sourcemaps.write('./', { sourceRoot: './src' }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('execute-test', function (done) {
  return new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function (karmaResult) {
    if (karmaResult === 1) {
      done('karma: tests failed with code ' + karmaResult);
    } else {
      done();
    }
  }).start();
});

gulp.task('coverage', function () {
  gulp.src('./coverage/coverage-final.json')
    .pipe(remapIstanbul({
      reports: {
        'lcovonly': './coverage/remap/lcov.info',
        'json': './coverage/remap/coverage.json',
        'html': './coverage/remap/html-report',
        'text-summary': './coverage/remap/text-summary.txt'
      }
    }))
    .on('finish', function () {
      console.log('Remapping done! View the result in coverage/html/remap/html-report');
    });
})

gulp.task('test', function () {
  return runSequence(
    'clean-test',
    'build-source',
    'execute-test',
    'coverage');
});

gulp.task('open-coverage-report', function () {
  gulp.src('./coverage/remap/html-report/index.html')
    .pipe($.open());
});

