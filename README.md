<h1 align="center" style="border-bottom: none;">💾 @topgunbuild/lmdb-adapter</h1>
<h3>Standard <a href="https://github.com/TopGunBuild/topgun">TopGun</a> Graph Adapter interface for <a href="https://github.com/kriszyp/lmdb-js">lmdb-js</a></h3>

<p align="center">
  <a href="https://npm.im/@topgunbuild/lmdb-adapter">
    <img alt="npm" src="https://badgen.net/npm/v/@topgunbuild/lmdb-adapter">
  </a>
  <a href="https://bundlephobia.com/result?p=@topgunbuild/lmdb-adapter">
    <img alt="bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@topgunbuild/lmdb-adapter.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Install

```bash
npm install @topgunbuild/lmdb-adapter
```

## How to use adapter

```js
import { TGServer } from 'topgun/server';
import { createLMDBAdapter } from '@topgunbuild/lmdb-adapter';

const server = new TGServer({
    adapter: createLMDBAdapter(),
    port: 8765
});
```

## License

MIT
