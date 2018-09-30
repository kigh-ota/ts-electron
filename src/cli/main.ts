import path from 'path';
import Initializer from '../core/Initializer';
import SampleRepository from '../core/sample/SampleRepository';

async function initialize(): Promise<SampleRepository> {
    const dataDir = process.env.NODE_DATADIR;
    if (!dataDir) {
        throw new Error('NODE_DATADIR is undefined');
    }
    const dbPath = path.join(dataDir, 'ts-electron.db');
    return await Initializer.initialize(dbPath);
}

async function addValueAndGetCount(sampleRepository: SampleRepository): Promise<number> {
    await sampleRepository.add(-1);
    return await sampleRepository.count();
}

initialize().then((sampleRepository) => {
    return addValueAndGetCount(sampleRepository);
}).then((count) => {
    process.stdout.write(String(count) + '\n');
});
