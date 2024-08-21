const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Load the URL of your choice.
  win.loadURL('https://mobile.pinduoduo.com');

  // Open the DevTools.
  // win.webContents.openDevTools();
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
      const response = await axios.get('https://mobile.pinduoduo.com');
      const $ = cheerio.load(response.data);
      
      // Extract shopping info here
      const shoppingInfo = extractShoppingInfo($);

      // Save or process shoppingInfo as needed
      console.log(shoppingInfo);
    } catch (error) {
      console.error(error);
    }
  }
};

ipcMain.on('export-shopping-info', (event) => {
  api.exportShoppingInfo();
});

function extractShoppingInfo($) {
  // Implement your scraping logic here
  return {}; // Return an object with the extracted data
}