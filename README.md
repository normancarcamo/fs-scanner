# fs-scanner
Scans a given directory and get back a tree with the results of the path and its sub-paths.

#### What aims to?
This module aims to give you an object with a tree to get any directory found using the "dot" notation, an array collection of the sub-paths and some other options to help you more.

#### Where it can be used?
- It can be used only with node because it uses the "fs" modules of node.js

#### Where it can not be used?
- It cannot be used as a browser module because it uses the "fs" module of node.js, although in this repository I'm going to give you some examples which how can you make use of it as a simple workaround.

#### Pre-requisites
  1. A html file to use as template.
  2. The html file must include a div or any element with an id attribute to mount the component.
  3. The components path or a file with all the routes. (see react-router v4 docs)

#### Installation

``npm install --save fs-scanner`` or ``yarn add fs-scanner``

#### Usage

Whenever you import it, it will give you a class to create instances.

```javascript
const Scanner = require('fs-scanner')
```

After having it imported you will need to pass some options to scan:

| name          | type         | default   | description                                                                   |
| ------------- | ------------ | --------- | ------------------------------------------------------------------------------|
| **path**      | string       | __dirname | Absolute path of the directory to scan.                                       |
| **index**     | string       | '_'       | A name used in the tree to access to the root of each directory.              |
| **prefix**    | object       | null      |This lets you to prepend a text to alter the name of each directory.           |
| **suffix**    | object       | null      |This lets you to append a text to alter the name of each directory.            |
| **ignore**    | string/array | null      | You can ignore a path using piece of string or an array with the name of the directories. |

#### Examples:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner()

console.log(scanner)

/*
Scanner {
  _path: '/Users/Owner/Projects/ScanDirectories',
  _ignore: null,
  _index: '_',
  _prefix: null,
  _suffix: null,
  _cwd: 'ScanDirectories',
  _directory: null,
  _isIgnored: false,
  _tree:
   { cwd:
      { _: '/Users/Owner/Projects/ScanDirectories',
        dist: [Object],
        src: [Object] } },
  _collection:
   [ '/Users/Owner/Projects/ScanDirectories',
     '/Users/Owner/Projects/ScanDirectories/dist',
     '/Users/Owner/Projects/ScanDirectories/src',
     '/Users/Owner/Projects/ScanDirectories/src/client',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/css',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/css/vendor',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/fonts',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/img',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/js',
     '/Users/Owner/Projects/ScanDirectories/src/client/assets/js/vendor',
     '/Users/Owner/Projects/ScanDirectories/src/client/components',
     '/Users/Owner/Projects/ScanDirectories/src/client/components/about',
     '/Users/Owner/Projects/ScanDirectories/src/server',
     '/Users/Owner/Projects/ScanDirectories/src/server/router',
     '/Users/Owner/Projects/ScanDirectories/src/shared' ] }
*/
```

#### Custom path:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner({
  path: root('./src')
})

console.log(scanner.tree)
console.log(scanner.collection)

/*
{ src:
   { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
     client:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
        assets: [Object],
        components: [Object] },
     server:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server',
        router: [Object] },
     shared:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' } } }
[ '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/css',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/css/vendor',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/fonts',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/img',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/js',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/assets/js/vendor',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components/about',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server/router',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' ]
*/
```
#### Ignoring:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner({
  path: root('./src'),
  ignore: '/assets',
})

console.log(scanner.tree)
console.log(scanner.collection)

/*
{ src:
   { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
     client:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
        components: [Object] },
     server:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server',
        router: [Object] },
     shared:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' } } }
[ '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components/about',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/server/router',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' ]
*/
```

#### Ignoring array:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner({
  path: root('./src'),
  ignore: ['/assets', 'server'],
})

console.log(scanner.tree)
console.log(scanner.collection)

/*
{ src:
   { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
     client:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
        components: [Object] },
     shared:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' } } }
[ '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/client/components/about',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' ]
*/
```

#### Using prefix and suffix:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner({
  path: root('./src'),
  ignore: ['/assets', 'server'],
  prefix: {
    client: 'prefijo',
  },
  suffix: {
    client: 'sufijo',
  },
})

console.log(scanner.tree)
console.log(scanner.collection)

/*
{ src:
   { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
     client:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo',
        components: [Object] },
     shared:
      { _: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' } } }
[ '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo/components',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo/components/about',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' ]
*/
```

#### Using a custom index:

```javascript
const { resolve } = require('path')
const root = src => resolve(process.cwd(), src)

const scanner = new Scanner({
  path: root('./src'),
  ignore: ['/assets', 'server'],
  prefix: {
    client: 'prefijo',
  },
  suffix: {
    client: 'sufijo',
  },
  index: '__root__',
})

console.log(scanner.tree)
console.log(scanner.collection)

/*
{ src:
   { __root__: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
     client:
      { __root__: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo',
        components: [Object] },
     shared:
      { __root__: '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' } } }
[ '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo/components',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/prefijo/client/sufijo/components/about',
  '/Users/norman/Projects/2017/jul/github/personal/ScanDirectories/src/shared' ]
*/
```

## Maintainers:

![Image of Mantainer](http://s.gravatar.com/avatar/c3d34f6dbeeef3c39942d0ecb1247228?s=80)<br/>
[Norman Carcamo](https://github.com/normancarcamo)<br/>
[NPM - modules](https://www.npmjs.com/~normanfx)<br/>