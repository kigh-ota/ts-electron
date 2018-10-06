import fs from 'fs';
import util from 'util';
import SampleService from '../core/sample/SampleService';

export default class IpcController {
    private sampleService: SampleService;

    public constructor(sampleService: SampleService) {
        this.sampleService = sampleService;
    }

    public async button(): Promise<number> {
        return await this.sampleService.addValueAndGetCount(-1);
    }

    public async fileDrop(filePath: string): Promise<string> {
        // TODO throw if not a file
        return util.promisify(fs.readFile)(filePath)
        .then((data) => {
            return data.toString();
        });
    }
}
