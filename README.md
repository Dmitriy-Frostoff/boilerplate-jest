# boilerplate-jest

It's a boilerplate for usage of `jest` testing framework in a future project. Check out the docs below to be in `actual tune`!

Jest is turned to use config file (but it can be pretty used without config). (check out the `./configs/jest/jest.config.js` file). Also Jest set to `ESM` usage;

---

**!caution** This can cause problems yet. Look at [jest ecmascript-modules](https://jestjs.io/docs/ecmascript-modules) for details before usage or:

- delete in the `package.json` `"type: module"`;
- use `CJS` `require('path/to/file')` instead of `import`;
- use in the `package.json` scripts: `test: "npx jest"` instead of `test: "node --experimental-vm-modules node_modules/jest/bin/jest.js"`;

---

`displayName` param in the `jest.config.js` can be pretty customized (see [displayName](https://jestjs.io/docs/configuration#displayname-string-object));

`errorOnDeprecated` param is turned to `true`, so all callings of deprecated APIs will throw an error messages (read more about that [errorOnDeprecated](https://jestjs.io/docs/configuration#errorondeprecated-boolean));

`testPathIgnorePatterns` param is turned to ignore all files in the `build` and `node_modules` folders;

`testRegex` param is turned to search test files (with extensions: `js`, `ts`. `jsx`, `tcx`) in the `test` folder and it's subfolders;

`verbose` param is turned to `true`, so Jest will always print detailed report about test results;

---

**Take a notice:**

- `rootDir` is a dir, where your `jest.config.js` is!
- `--config='path/to/config'` in the `package.json` => `scripts.test` **must** be used for proper connection of your config file! (`--config` === `-c`). Check current config file using

```bash
  npm test -- --showConfig
```

in the CLI  
(**notes**: `npm test` === `npm t`; about `--` like `npm test -- ...` read here [What does -- do when running an npm command?](https://stackoverflow.com/questions/43046885/what-does-do-when-running-an-npm-command)).

---

For usage with `ESlint` and `Prettier` (e.g. from my boilerplate [boilerplate-eslint-prettier-husky](https://github.com/Dmitriy-Frostoff/boilerplate-eslint-prettier-husky)) add the following lines to the ESlint's config:

```js
...
  overrides: [
  {
    files: ['test/**/*'],
    env: {
      jest: true,
    },
  },
],
...
```

to prevent problems with linting (read more in the [Jest Doc](https://jestjs.io/docs/getting-started#using-eslint)).

---

`Important!!! Before usage, check the actuality of the scripts and settings by links below!!! The currents one could be outdated.`

### The boilerplate structure and brief descriptions:

- `cache/jest` - the folder includes Jest cache of running tests and details. To clear it use this command in the CLI

```bash
  npx jest --config=configs/jest/jest.config.js --clearCache
```

or

```bash
  npm test -- --clearCache
```

- `configs/` - the folder includes config and ignore files, currently for the Jest package (**note**: to create a `jest.config.js` use `npx jest --init` in the CLI);
- `src/` - source folder for a future project;
- `.gitignore` - exlude `node_modules` and `cache` from git watching;
- `LICENSE` - license file;
- `package.json` - the heart of all.
  Check the scripts. Jest finds the config file (if one exist) automatically;

  With the new packages releases, the ones above can turn to pumpkin, so check'em out with official docs!!!

### Links:

- [Jest the official website](https://jestjs.io/)
- [Jest the official documentation](https://jestjs.io/docs/getting-started)
- [Jest the API's details](https://jestjs.io/docs/api)
- [Configuring Jest](https://jestjs.io/docs/configuration)
- [Jest CLI Options](https://jestjs.io/docs/cli)
- [the official GitHub repository of Jest](https://github.com/jestjs/jest)

- [checkout the usage of ESM via Jest](https://jestjs.io/docs/ecmascript-modules)

`Don't forget to show the world you're using Jest!` &copy; Jest team  
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)](https://github.com/jestjs/jest)  
[![jest tested](https://img.shields.io/badge/Jest-tested-eee.svg?logo=jest&labelColor=99424f)](https://github.com/jestjs/jest)  
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/jestjs/jest)

#### done: February 20, 2024
