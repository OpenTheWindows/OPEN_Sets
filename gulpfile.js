var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  bowerFiles = require('main-bower-files'),
  concat = require('gulp-concat-sourcemap'),
  deploy = require('gulp-gh-pages'),
  del = require('del'),
  runSequence = require('run-sequence'),
  remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");

var KarmaServer = require('karma').Server;
var jasmine = require('gulp-jasmine');

var paths = {
  assets: 'src/assets/**/*',
  less: 'src/css/main.less',
  index: 'src/index.html',
  ts: 'src/scripts/**/*.ts',
  spec: 'src/tests/**/*.spec.ts',
  build: 'build',
  dist: 'dist'
};

gulp.task('clean', function (cb) {
  return del([paths.build, paths.dist], cb);
});

gulp.task('copy', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + '/assets'));
});

var tsProject = $.typescript.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true,
  sourceRoot: '../scripts'
});

var specProject = $.typescript.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true,
  sourceRoot: '../tests'
});

gulp.task('typescript', function() {
  var tsResult = gulp.src([paths.ts])
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject));
    
  return tsResult.js
    .pipe(concat('main.js'))
    //.pipe($.sourcemaps.write(paths.build))
    .pipe(gulp.dest(paths.build));
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
  gulp.watch(paths.assets, ['assets']);
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

gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

gulp.task('default', function () {
  runSequence('clean', ['inject', 'typescript', 'less', 'connect', 'watch'], 'open');
});
gulp.task('build', function () {
  return runSequence('clean', ['copy', 'minifyJs', 'minifyCss', 'processhtml']);
});

gulp.task('cache:clear', function () {
  return cache.clearAll()
});

gulp.task('clean-test', function (cb) {
return del(['src/scripts/services/*.js', 'src/scripts/services/*.map', 'src/tests/*.js', 'src/tests/*.map','/src/tests/dist/'], cb);
});

gulp.task("build-source", function () {
  return gulp.src('src/scripts/services/*.ts')
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject))
    .pipe($.sourcemaps.write('./', {sourceRoot: './services'}))
    .pipe(gulp.dest(__dirname + '/src/scripts/services/'));
});

gulp.task("build-test", function () {
var specResult = gulp.src(paths.spec)
    .pipe($.sourcemaps.init())
    .pipe($.typescript(specProject))
    .pipe($.sourcemaps.write('./', {sourceRoot: './services'}))
    .pipe(gulp.dest(__dirname + '/src/tests'));
});

gulp.task('pre-test', function (done) {
  var b = browserify({
    standalone: 'test',
    entries: __dirname + '/src/tests/spec.js',
    debug: true
  });

  return b.bundle()
    .pipe(source("spec.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/src/tests/dist/"));
});

gulp.task('execute-test', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('open-test-coverage', function () {
  gulp.src('./coverage/html/remap/html-report/index.html')
    .pipe($.open());
});

gulp.task('test', function() {
  return runSequence(
    'clean-test',
    ['build-source', 'build-test'],
    'execute-test',
    'coverage',
    'open-test-coverage');
});

gulp.task('coverage', function(){
  gulp.src('./coverage/html/coverage-final.json')
        .pipe(remapIstanbul({
            reports: {
                'lcovonly': './coverage/html/remap/lcov.info',
                'json': './coverage/html/remap/coverage.json',
                'html': './coverage/html/remap/html-report',
                'text-summary': './coverage/html/remap/text-summary.txt'
            }
        }))
        .on('finish', function () {
            console.log('Remapping done! View the result in coverage/html/remap/html-report');
        });
})

