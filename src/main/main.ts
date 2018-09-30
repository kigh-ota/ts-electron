import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import Initializer from '../core/Initializer';
import IpcController from './IpcController';

let win: BrowserWindow | null;

app.on('ready', async () => {
    await initialize();
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

async function initialize() {
    const dbPath = path.join(app.getPath('documents'), 'ts-electron.db');
    const sampleRepository = await Initializer.initialize(dbPath);

    const ipcController = new IpcController(sampleRepository);

    ipcMain.on('buttonChannel', async (event: any) => {
        const count = await ipcController.button();
        event.sender.send('buttonChannel-reply', count);
    });
}

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadFile('index.html');
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools();
    }
    win.on('closed', () => {
        win = null;
    });
}
