import path from 'path';
import {Database, OPEN_CREATE, OPEN_READWRITE} from 'sqlite3';
import SampleRepository from '../core/sample/SampleRepository';
import SampleRepositoryImpl from '../core/sample/SampleRepositoryImpl';

async function initialize(): Promise<SampleRepository> {
    const dataDir = process.env.NODE_DATADIR;
    if (!dataDir) {
        throw new Error('NODE_DATADIR is undefined');
    }
    const dbPath = path.join(dataDir, 'ts-electron.db');
    const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE);

    const sampleRepository = new SampleRepositoryImpl(db);
    await sampleRepository.init();
    return sampleRepository;
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
