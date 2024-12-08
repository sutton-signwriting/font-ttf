import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { version } from './package.json';

const file = (name, ext) => `${name}.${ext}`;
const fileMin = (name, ext) => `${name}.min.${ext}`;
const banner = (name) => '/**' +
  '\n* Sutton SignWriting TrueType Font Module v' + version + ' (https://github.com/sutton-signwriting/font-ttf)' +
  '\n* Author: Steve Slevinski  (https://SteveSlevinski.me)' +
  '\n* ' + name + ' is released under the MIT License.' +
  '\n*/\n';const footer = '\n/* support ongoing development on https://patreon.com/signwriting */';
  const bannerMin = () => '/* Sutton SignWriting TrueType Font Module v' + version + ' (https://github.com/sutton-signwriting/font-ttf)' +
  ', author: Steve Slevinski (https://SteveSlevinski.me), license: MIT */';
const footerMin = '/* the end */';

const defOut = (name, format, dirname, filename, ext) => ({
  name: name,
  format: format,
  file: dirname + file(filename, ext),
  banner: banner(file(filename, ext)),
  footer: footer,
});

const defOutMin = (name, format, dirname, filename, ext) => ({
  name: name,
  format: format,
  file: dirname + fileMin(filename, ext),
  banner: bannerMin(fileMin(filename, ext)),
  footer: footerMin,
});

const defOutAll = (name, dirname, filename) => [
  defOut(name, 'umd', dirname, filename, 'js'),
  defOut(name, 'esm', dirname, filename, 'mjs'),
];

const defOutMinAll = (name, dirname, filename) => [
  defOutMin(name, 'umd', dirname, filename, 'js'),
  defOutMin(name, 'esm', dirname, filename, 'mjs'),
];

const main = (input, name, dirname, filename) => ({
  input: input,
  output: defOutAll(name, dirname, filename),
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
  ],
});

const min = (input, name, dirname, filename) => ({
  input: input,
  output: defOutMinAll(name, dirname, filename),
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    terser({
      output: {
        comments: `/TrueType Font Module/`
      },
    }),
  ],
});

const sections = (input, name, dirname, filename) => [
  main(input, name, dirname, filename),
  min(input, name, dirname, filename),
];

export default [
  ...sections('src/index.js', 'ssw.ttf', './', 'index'),
  ...sections('src/font/index.js', 'ssw.ttf.font', './font/', 'font'),
  ...sections('src/fsw/index.js', 'ssw.ttf.fsw', './fsw/', 'fsw'),
  ...sections('src/swu/index.js', 'ssw.ttf.swu', './swu/', 'swu'),
];
