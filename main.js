const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the URL of your choice.
  win.loadURL('https://mobile.pinduoduo.com');

  // Optionally open the DevTools.
  // win.webContents.openDevTools();

  // Set up the menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Export Shopping Info',
          click: () => {
            win.webContents.send('export-shopping-info');
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ];

  // Create the menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Add this to your main.js file
const api = {
  exportShoppingInfo: async function() {
    try {
      const { webContents } = BrowserWindow.getFocusedWindow();
      
      // Send a message to the renderer process to get the page source.
      webContents.send('get-page-source');
      
      webContents.once('page-source', (event, pageSource) => {
        const $ = cheerio.load(pageSource);
        
        // Extract shopping info here
        const shoppingInfo = extractShoppingInfo($);

        // Save or process shoppingInfo as needed
        console.log(shoppingInfo);
      });
    } catch (error) {
      console.error(error);
    }
  }
};

ipcMain.on('export-shopping-info', (event) => {
  api.exportShoppingInfo();
});

// Listen for the 'page-source' event from the renderer process.
ipcMain.on('page-source', (event, pageSource) => {
  event.reply('page-source', pageSource); // This is just to pass the source back to the same listener.
});

function extractShoppingInfo($) {
  // Implement your scraping logic here
  return {}; // Return an object with the extracted data
}
