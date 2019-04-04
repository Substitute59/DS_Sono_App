const {app, BrowserWindow} = require('electron')

const fs = require('fs')

let filesList = [];
fs.readdir(__dirname + '/app/photos', function (err, items) {
  for (let i = 0; i < items.length; i++) {
    filesList.push(items[i]);
  }
});

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('app/index.html')

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('images', filesList);
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
