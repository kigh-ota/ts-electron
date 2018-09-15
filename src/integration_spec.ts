import assert from 'assert';
import electronPath from 'electron';
import path from 'path';
import {Application} from 'spectron';

describe('Application launch', () => {
    let app: Application;

    beforeEach(() => {
        app = new Application({
            path: ((electronPath as any) as string),
            args: [path.join(__dirname, '..')],
        });
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', () => {
        return app.client.getWindowCount().then((count) => {
            assert.equal(count, 1);
        });
    });
});
