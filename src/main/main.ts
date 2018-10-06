import {app, BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';
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
    const instances = await Initializer.initialize(dbPath);

    const ipcController = new IpcController(instances.sampleService);

    ipcMain.on('buttonChannel', async (event: any) => {
        log.info('buttonChannel');
        const count = await ipcController.button();
        event.sender.send('buttonChannel-reply', count);
    });

    ipcMain.on('fileDropChannel', async (event: any, filePath: string) => {
        log.info('fileDropChannel');
        const result = await ipcController.fileDrop(filePath);
        event.sender.send('fileDropChannel-reply', result);
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
