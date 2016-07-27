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
 │   ├──app.js                          * the Electron main 'process' script
 │   ├──config.js                       * file that contains our game's configuration parameters
 │   │ 
 │   ├──scripts/                        
 │   │   ├──definitions/                * folder that holds the typescript definition files (d.ts) for the js libraries we use
 │   │   ├──helpers/                    * folder that holds the helpers: GameState is a singleton that holds the game's state 
 │   │   ├──models/                     * folder that holds our models
 │   │   ├──services/                   * folder that holds the services for the game logic and management services for the Phaser states
 │   │   ├──states/                     * folder that holds our game's Phaser states
 │   │   └──Game.ts                     * our Phaser game file
 │   │        
 │   ├──tests/                          * folder that holds the tests for the services
 │   │        
 │   ├──css/                            * our stylesheets are here
 │   │     
 │   └──assets/                         * folder that holds the assets
 │       ├──animations/                 * animation atlases are stored here
 │       ├──images/                     * images are stored here
 │       ├──pairs/                      * images of the pairs are stored here
 │       ├──pointers/                   * pointer images are stored here
 │       ├──sounds/                     * sounds are stored here  
 │       ├──final-animation.json        * file that contains information for the frames of the final game animation 
 │       ├──happy-animations.json       * file that contains all the happy animations for the game
 │       └──pairs.json                  * file that contains all the pairs for the game
 │        
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
npm test:coverage
```

## Packing the Electron app
* uncomment the `electron build:uncomment` sections from the `index.html`
* comment the `build:remove` scripts block from the `index.html`
```bash
npm run pack
```
