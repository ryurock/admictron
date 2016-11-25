const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain

const path = require('path')
const Url = require('url')

const Auth = require('./src/main-process/lib/auth')

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(Url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipc.on('auth', function (event, _) {
  auth = new Auth(win)
  auth.authenticate(function(error, response){
    event.sender.send('auth-reply', {
      user: response,
      error: error
    })
  })
})
