const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 820
  });

  // Open the DevTools
  // mainWindow.webContents.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
