import {app, BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';
import path from 'path';
import Initializer from '../core/Initializer';
import { ADD_SAMPLE_VALUE_AND_GET_COUNT, READ_FILE, reply } from '../ipc';
import IpcController from './IpcController';

let win: BrowserWindow | null;

app.on('ready', async () => {
    await initialize();
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

function registerIpc<Req, Res>(channel: string, handler: (req: Req) => Res) {
    ipcMain.on(channel, async (event: any, req: Req) => {
        log.info(channel);
        const res = await handler(req);
        event.sender.send(reply(channel), res);
    });
}

async function initialize() {
    const dbPath = path.join(app.getPath('documents'), 'ts-electron.db');
    const instances = await Initializer.initialize(dbPath);

    const ipcController = new IpcController(instances.sampleService);

    registerIpc(ADD_SAMPLE_VALUE_AND_GET_COUNT, ipcController.addSampleValueAndGetCount.bind(ipcController));
    registerIpc(READ_FILE, ipcController.readFile.bind(ipcController));
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
