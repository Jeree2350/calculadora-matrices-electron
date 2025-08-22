const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,  // Desactivar seguridad web para desarrollo
      allowRunningInsecureContent: true,
      experimentalFeatures: true
    },
    show: false
  })

  mainWindow.loadFile('src/index.html')
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Para desarrollo - ver la consola
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Desactivar advertencias de seguridad para desarrollo
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'