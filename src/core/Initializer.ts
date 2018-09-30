import {Database, OPEN_CREATE, OPEN_READWRITE} from 'sqlite3';
import SampleRepository from './sample/SampleRepository';
import SampleRepositoryImpl from './sample/SampleRepositoryImpl';

export default class Initializer {
    public static async initialize(dbPath: string): Promise<SampleRepository> {
        const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE);

        const sampleRepository: SampleRepository = new SampleRepositoryImpl(db);
        await sampleRepository.init();
        return sampleRepository;
    }
}
