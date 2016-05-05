module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    files: [
      { pattern: './src/scripts/services/**/*.ts', included: false },
      { pattern: './src/tests/**/*.ts', included: false },
      { pattern: './dist/*.js', included: true, watched: false },      
      { pattern: './dist/*.js.map', included: false }
    ],
    exclude: [],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-typescript-preprocessor',
      'karma-remap-istanbul',
      'karma-chrome-launcher'
    ],

    preprocessors: {
      './dist/!(*spec).js': ['coverage', 'sourcemap'],
    },

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html', dir: 'coverage/' },
        { type: 'json', subdir: 'html', dir: 'coverage/' },
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
