const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

const bigPrefix = "url('assets/pointers/";
const bigSuffix = "_b.png') 47 7, auto";
const smallPrefix = "url('assets/pointers/";
const smallSuffix = "_s.png') 55 35, auto";

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 820
  });

  // Open the DevTools
  // mainWindow.webContents.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  const cursorSize = process.argv[1];
  const cursorColor = process.argv[2].charAt(0);
  let big = bigPrefix + cursorColor + bigSuffix;
  let small = smallPrefix + cursorColor + smallSuffix;
  global.cursor = cursorSize === "m" ? big : small;

  const language = process.argv[3];
  global.language = language;

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    // Save the statistics when the app is closed
    mainWindow = null;
  });
});

