# ts-electron

[![CircleCI](https://circleci.com/gh/kigh-ota/ts-electron.svg?style=svg)](https://circleci.com/gh/kigh-ota/ts-electron)

Starter for app development using Electron, TypeScript, React together with native modules (sqlite3).

## Files & Directories

- `src/`
  - `main/**/*.tsx?`: Electron Main (including tests)
  - `renderer/**/*.tsx?`: Electron Renderer (including tests)
  - `integration_test/**/*.ts`: Electron Integration Tests
  - `cli/*.ts`: CLI
  - `core/`: Domain Logic
- `app/`: Electron App
  - `generated/`
    - `main.js`
    - `renderer.js`
  - `package.json`
  - `index.html`
- `package.json`

## TODO

- Debugging
- Production Mode
