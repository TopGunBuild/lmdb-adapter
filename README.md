<h1 align="center" style="border-bottom: none;">💾 topgun-lmdb-adapter</h1>
<h3>Standard <a href="https://github.com/TopGunBuild/topgun">TopGun</a> Graph Adapter interface for <a href="https://github.com/kriszyp/lmdb-js">LMDB</a></h3>

<p align="center">
  <a href="https://github.com/semantic-release/semantic-release">
      <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://npm.im/topgun-lmdb-adapter">
    <img alt="npm" src="https://badgen.net/npm/v/topgun-lmdb-adapter">
  </a>
  <a href="https://bundlephobia.com/result?p=topgun-lmdb-adapter">
    <img alt="bundlephobia" src="https://img.shields.io/bundlephobia/minzip/topgun-lmdb-adapter.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Install

`npm install topgun-lmdb-adapter`

## How to use adapter

```js
import { TGServer } from 'topgun/server';
import { createLMDBAdapter } from 'topgun-lmdb-adapter';

const server = new TGServer({
    adapter: createLMDBAdapter(),
    port: 8765
});
```

## License

MIT
