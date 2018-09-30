import log from 'electron-log';
import SampleService from '../core/sample/SampleService';

export default class IpcController {
    private sampleService: SampleService;

    public constructor(sampleService: SampleService) {
        this.sampleService = sampleService;
    }

    public async button(): Promise<number> {
        log.info('buttonChannel');
        return await this.sampleService.addValueAndGetCount(-1);
    }
}
