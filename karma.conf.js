module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine-ajax','jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    exclude: [],

    files: [
      { pattern: './src/scripts/services/**/*.ts', included: false },
      { pattern: './dist/**/*.js', included: true, watched: false },
      { pattern: './dist/scripts/**/*.js.map', included: false }
    ],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-typescript-preprocessor',
      'karma-chrome-launcher',
      'karma-jasmine-ajax'
    ],

    preprocessors: {
      './dist/scripts/!(models)/**/*.js': ['coverage', 'sourcemap'],
    },

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: '.', dir: 'coverage/' },
        { type: 'json', subdir: '.', dir: 'coverage/' },
        { type: 'text-summary', subdir: '.' }
      ]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity
  })
}
