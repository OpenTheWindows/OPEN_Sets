module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

    files: [
      { pattern: './src/scripts/services/*.ts', included: false },
      { pattern: './src/scripts/services/*.js', included: true },
      { pattern: './src/tests/dist/spec.js', included: true },
      { pattern: './src/scripts/services/*.js.map', included: false },
      { pattern: './src/tests/*.js', included: false },
      { pattern: './src/tests/*.ts', included: false },
      { pattern: './src/tests/*.js.map', included: false }
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
      './src/scripts/services/*.js': ['coverage', 'sourcemap'],
      './src/tests/*.js': ['sourcemap']
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
