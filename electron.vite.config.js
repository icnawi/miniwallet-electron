import GlobalPolyFill, { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import builtinModules from 'builtin-modules';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import commonjsExternals from 'vite-plugin-commonjs-externals';

import pkg from './package.json';

const commonjsPackages = [
  'electron',
  'electron/main',
  'electron/common',
  'electron/renderer',
  'original-fs',
  // 'circomlib',
  // 'websnark',
  ...builtinModules,
  // ...Object.keys(pkg.dependencies).map(name => new RegExp('^' + escapeRegExp(name) + '(\\/.+)?$')),
];

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ['buffer'] })],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
        // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
        // process and buffer are excluded because already managed
        // by node-globals-polyfill
        // util: 'rollup-plugin-node-polyfills/polyfills/util',
        // sys: 'util',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        // path: 'rollup-plugin-node-polyfills/polyfills/path',
        // querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
        // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
        // url: 'rollup-plugin-node-polyfills/polyfills/url',
        // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
        buffer: 'buffer',
        // process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
        // http: 'rollup-plugin-node-polyfills/polyfills/http',
        // https: 'rollup-plugin-node-polyfills/polyfills/http',
        // os: 'rollup-plugin-node-polyfills/polyfills/os',
        // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
        // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
        // _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        // _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        // _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        // _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        // _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
        // console: 'rollup-plugin-node-polyfills/polyfills/console',
        // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
        // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
        // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
        // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      },
    },
    plugins: [react(), commonjsExternals({ externals: commonjsPackages })],
    // build: {
    //   rollupOptions: {
    //     plugins: [inject({ Buffer: ['Buffer', 'Buffer'], process: 'process' })],
    //   },
    //   commonjsOptions: { transformMixedEsModules: true },
    // },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          GlobalPolyFill({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
  },
});
