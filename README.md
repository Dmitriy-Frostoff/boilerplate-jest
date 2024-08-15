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
- `--config='path/to/config'` in the `package.json` => `scripts.test` **must** be used for a proper connection of your config file! (`--config` === `-c`). Check current config file's usage

```bash
  npm test -- --showConfig
```

in the CLI.  
(**notes**: `npm test` === `npm t`; about `--` like `npm test -- ...` read here [What does -- do when running an npm command?](https://stackoverflow.com/questions/43046885/what-does-do-when-running-an-npm-command)).

---

### !Important

`Before the usage, check the actuality of the scripts and settings by links below!!! The currents one could be outdated.`

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
  **note:** it is preferable to place **unit tests** next to the corresponding files!
- `tests/` - folder for tests in a future project (**integration** and **e2e** ones for entire project testing!);
- `.editorconfig` - the project common settings (as for now it's as in RSSChool recommended check the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for more.  
  **note**: `EditorConfig` extension required!);
- `.gitignore` - exlude `node_modules`, `cache` and a few more folders from git watching (check the file for more);
- `LICENSE` - license file;
- `package.json` - the heart of all.
  Check the scripts. Jest finds the config file (if one exist) automatically;

  With the new packages releases, the ones above can turn to pumpkin, so check'em out with official docs!!!

### Integration with [`Connections`](#Connections) links:

To integrate the boilerplate do the following steps (**note**: copy the project structure as is!!!):

- add the following lines to the `package.json`:

```json
...
"type": "module",
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js -c=configs/jest/jest.config.js"
},
...
```

- copy the `configs`, `tests`, `.editorconfig`, `.gitignore` (optionally);

- install current packages as `devDependencies` via bash command below:

```bash
npm i -D @types/jest eslint-plugin-jest jest ts-jest
```

- add or overwrite the following lines of the `ESlint config`:

```js
...
  {
      env: {
        mocha: true,
        jest: true,
      },
      files: ['**/*.test.js'],
      extends: ['plugin:jest/recommended', 'airbnb-base', 'prettier'],
    },
    {
      env: {
        mocha: true,
        jest: true,
      },
      files: ['**/*.test.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: path.resolve(__dirname, '../ts/tsconfig.json'),
        ecmaVersion: 'latest',
      },
    },
...
```

- check the `roots: ['<rootDir>', '<rootDir>/tests', '<rootDir>/src']` in the `configs/jest/jest.config.js` to add directory with the right source code;
- check the `testMatch[]` and `testPathIgnorePatterns[]` to suit your project structure;
- check the `transform -> ... -> {'tsconfig': path/to/config}` to suit your `tsconfig.json` file path;
- for Frontend development `testEnvironment: 'jsdom'` is prefered (p.s. it can perfectly deal with non - backend
  specified APIs too), but if there's a need to test Backend specified code
  use two separated `jest` configs (e.g. `jest.frontend.config.js` and `jest.backend.config.js`), where
  `jest.frontend.config.js` includes `testEnvironment: 'jsdom'` and
  `jest.backend.config.js` includes `testEnvironment: 'node'` or `testEnvironment: 'nodeNext'`;
- do all the steps from the top of the document's [# !Important](#!Important) (i.e. rename `projectName`, delete unnecessary files);

to prevent problems with linting (read more in the [Jest Doc](https://jestjs.io/docs/getting-started#using-eslint)).

### Adding testing-library to React based project:

- Install required packages:

  ```bash
  npm install jest-environment-jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
  ```

- create `jest-setup.ts` or `jest-setup.js` (for `TS` or `JS` based project) at `configs/jest/` with the following entries:

  ```ts
  import "@testing-library/jest-dom";
  ```

  it will give you an opportunity not to import `"@testing-library/jest-dom"` in every file
  (it will be imported automatically). Also via same way usage in this file you can add all the desired imports
  to use them in every testing file and reduce redundant `import` 's duplications.

- check the `configs/jest/jest.config.js` to have the options enabled:

  ```js
    // jest.config.js
    preset: 'ts-jest', // if you ' re using TypeScript in tests
    setupFilesAfterEnv: ['<rootDir>/configs/jest/jest-setup.ts'], // to enable jest-setup.ts (or jest-setup.js)
    // with desired options to all tests
    testEnvironment: 'jsdom', // for frontend only (or for non NodeJS specific features for tests (not for backend))
    // for backend use `NodeNext` or appropriate. `jsdom` suits perfectly in most cases because it has particually
    // all the functionality of `Node` option environment but with additional DOM API support
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'configs/ts/tsconfig.json', // !!! Required! Else tsconfig won't be used
        },
      ],
    }, // for TS based project is !strongly required! othewise `tsconfig.json` won't be used in tests!!!
  ```

  It's recommended to check this boilerplate's `configs/jest/jest.config.js` for more details and clarifying comments in it.

- check the `configs/eslint/.eslintrc.cjs` to have this settings or add them:

  ```js
  // configs/eslint/.eslintrc.cjs at `module.exports.overrides` right after the after object with `files: ['*.tsx, *.ts'],`
  {
      env: {
        mocha: true,
        jest: true,
      },
      files: ['**/*.test.js', '**/*.test.jsx'],
      extends: ['airbnb-base', 'prettier'],
    },
    {
      env: {
        mocha: true,
        jest: true,
      },
      files: ['**/*.test.ts', '**/*.test.tsx', 'jest-setup.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: path.resolve(__dirname, '..', 'ts', 'tsconfig.json'),
        ecmaVersion: 'latest',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off', // check https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md about that
      },
    },
  ```

  **Notice:** search for `cheat sheet` s for a tool, it's very convenient! e.g. `jest cheat sheet`

### Links:

#### Jest:

- [Jest the official website](https://jestjs.io/);
- [Jest the official documentation](https://jestjs.io/docs/getting-started);
- [Jest the API's details](https://jestjs.io/docs/api);
- [Configuring Jest](https://jestjs.io/docs/configuration);
- [Jest CLI Options](https://jestjs.io/docs/cli);
- [The official GitHub repository of Jest](https://github.com/jestjs/jest);
- [checkout the usage of ESM via Jest](https://jestjs.io/docs/ecmascript-modules);
- [The official GitHub repository of jsdom](https://github.com/jsdom/jsdom);

#### Testing-library:

- [Testing Library the official website](https://testing-library.com/);
- [Testing Library the official documentation](https://testing-library.com/docs/);
- [Testing Library PI's details](https://testing-library.com/docs/queries/about);
- [The official github repo of dom-testing-library](https://github.com/testing-library/dom-testing-library);
- [dom-testing-library Cheatsheet](https://testing-library.com/docs/dom-testing-library/cheatsheet);
- [The official github repo of jest-dom](https://github.com/testing-library/jest-dom);
- [The official github repo of user-event](https://github.com/testing-library/user-event);

#### React Testing Library:

- [React Testing Library the official website](https://testing-library.com/docs/react-testing-library/intro/);
- [The official github repo of react-testing-library](https://github.com/testing-library/react-testing-library);
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/);

#### Glob Patterns:

- [glob (programming)](<https://en.wikipedia.org/wiki/Glob_(programming)>);
- [A Beginner's Guide: Glob Patterns by Malik Browne, Nov 2019](https://www.malikbrowne.com/blog/a-beginners-guide-glob-patterns/);

#### ESLint:

- [The official page of eslint-plugin-jest at npmjs.com](https://www.npmjs.com/package/eslint-plugin-jest);
- [The official github repo of eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest);

#### TypeScript:

- [Jest official docs. Using TypeScript](https://jestjs.io/docs/getting-started#using-typescript);
- [The official page of @types/jest at npmjs.com for TypeScript support](https://www.npmjs.com/package/@types/jest);
- [The official page of ts-jest at npmjs.com for TypeScript support](https://www.npmjs.com/package/ts-jest);
- [The official GitHub repository of ts-jest](https://github.com/kulshekhar/ts-jest);
- [The official page of ts-node at npmjs.com](https://www.npmjs.com/package/ts-node);
- [The official GitHub repository of ts-node](https://github.com/TypeStrong/ts-node);
- [Files with the same name (without extensions) are not parsable](https://github.com/typescript-eslint/typescript-eslint/issues/955);
- [The official page of tsx at npmjs.com](https://www.npmjs.com/package/tsx);
- [The official GitHub repository of tsx](https://github.com/privatenumber/tsx);

#### Connections:

- [boilerplate-eslint-prettier-husky](https://github.com/Dmitriy-Frostoff/boilerplate-eslint-prettier-husky);
- [boilerplate-webpack-gulp-html-scss-js-components](https://github.com/Dmitriy-Frostoff/boilerplate-webpack-gulp-html-scss-js-components);
- [boilerplate-webpack-gulp-html-scss-ts-components](https://github.com/Dmitriy-Frostoff/boilerplate-webpack-gulp-html-scss-ts-components);

`Don't forget to show the world you're using Jest!` &copy; Jest team  
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?logo=jest)](https://github.com/jestjs/jest)  
[![jest tested](https://img.shields.io/badge/Jest-tested-eee.svg?logo=jest&labelColor=99424f)](https://github.com/jestjs/jest)  
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/jestjs/jest)

#### done: August 15, 2024
