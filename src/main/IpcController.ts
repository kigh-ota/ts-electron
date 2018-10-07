import FileReader from '../core/FileReader';
import SampleService from '../core/sample/SampleService';

export default class IpcController {
    private sampleService: SampleService;

    public constructor(sampleService: SampleService) {
        this.sampleService = sampleService;
    }

    public button(): Promise<number> {
        return this.sampleService.addValueAndGetCount(-1);
    }

    public fileDrop(filePath: string): Promise<string> {
        return new FileReader().read(filePath);
    }
}
