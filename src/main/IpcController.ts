import log from 'electron-log';

export default class IpcController {
    public static button() {
        log.info('buttonChannel');
    }
}
