# OPEN_Sets [![Build Status](https://travis-ci.org/OpenTheWindows/OPEN_Sets.svg?branch=master)](https://travis-ci.org/OpenTheWindows/OPEN_Sets)
The "Sets" game project.

1. Phaser
2. Typescript
3. Gulp
4. Jasmine (unit tests) + Karma (test runner)
5. Electron

## File Structure
```
OPEN_Sets/
 |
 ├──src/                                * our source files for the game and the logic
 |   ├──index.html                      * where we start our Phaser game
 │   │        
 │   ├──scripts/                        
 │   │   ├──services/                   * folder that holds the services for the game logic
 │   │   ├──states/                     * folder that holds our game's Phaser states
 │   │   ├──models/                     * folder that holds our models
 │   │   ├──definitions/                * folder that holds the Phaser's typescript definitions
 │   │   └──Game.ts                     * our Phaser game file
 │   │        
 │   ├──tests/                          * folder that holds the tests for the services
 │   │        
 │   ├──css/                            * static assets are served here
 │   │     
 │   └──assets/                         * our stylesheets are here
 │       ├──animations/                 * animation atlases are stored here
 │       ├──images/                     * images are stored here
 │       ├──pointers/                   * pointer images are stored here
 │       └──sounds/                     * sounds are stored here  
 │        
 ├──app.js                              * the electron main 'process' script
 ├──bower.json                          * what bower uses to install phaser
 ├──gulpfile.js                         * gulp file with the core tasks
 ├──karma.conf.js                       * config for the karma test runner
 ├──tslint.json                         * typescript lint config
 ├──tsconfig.json                       * config that gulp build task uses for typescript
 ├──tsconfig.spec.json                  * config that gulp test task uses for typescript
 ├──typings.json                        * our typings manager
 └──package.json                        * what npm uses to manage it's dependencies
```

# Getting Started

## Installation
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

## Running the app
```bash
npm start
```

### Running the unit tests
```bash
npm test
```
