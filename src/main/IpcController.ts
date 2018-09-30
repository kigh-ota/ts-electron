import log from 'electron-log';
import SampleRepository from '../core/sample/SampleRepository';

export default class IpcController {
    private sampleRepository: SampleRepository;

    public constructor(sampleRepository: SampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    public async button(): Promise<number> {
        log.info('buttonChannel');
        await this.sampleRepository.add(-1);
        return await this.sampleRepository.count();
    }
}
