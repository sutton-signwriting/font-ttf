import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { version } from './package.json';

const file = (name, ext) => `${name}.${ext}`
const fileMin = (name, ext) => `${name}.min.${ext}`
const banner = (name) => '/**' +
  '\n* Sutton SignWriting TrueType Font Module v' + version +
  '\n* https://github.com/Slevinski/SignWriting' +
  '\n* Copyright (c) 2007-2019, Steve Slevinski' +
  '\n* ' + name + ' is released under the MIT License.' +
  '\n*/\n';
const footer = '\n/* help fund development on https://patreon.com/signwriting */';
const bannerMin = () => '/* Sutton SignWriting Core Module v' + version +
  ', author: Steve Slevinski, license: MIT */';
const footerMin = '/* the end */';

const defOut = (name, format, dirname, filename, ext) => {
  return {
    name: name,
    format: format,
    file: dirname + file(filename, ext),
    banner: banner(file(filename, ext)),
    footer: footer
  }
};
const defOutMin = (name, format, dirname, filename, ext) => {
  return {
    name: name,
    format: format,
    file: dirname + fileMin(filename, ext),
    banner: bannerMin(fileMin(filename, ext)),
    footer: footerMin
  }
};

const defOutAll = (name, dirname, filename) => [
  defOut(name, 'umd', dirname, filename, 'js'),
  defOut(name, 'esm', dirname, filename, 'mjs')
];
const defOutMinAll = (name, dirname, filename) => [
  defOutMin(name, 'umd', dirname, filename, 'js'),
  defOutMin(name, 'esm', dirname, filename, 'mjs')
];

const main = (input, name, dirname, filename) => {
  return {
    input: input,
    output: defOutAll(name, dirname, filename),
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
}

const min = (input, name, dirname, filename) => {
  return {
    input: input,
    output: defOutMinAll(name, dirname, filename),
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser({
        output: {
          comments: `/Sutton/`
        }
      })
    ]
  }
}

const sections = (input, name, dirname, filename) => [
  main(input, name, dirname, filename),
  min(input, name, dirname, filename),
]

export default [
  ...sections('src/index.js', 'ssw.ttf', './', 'index'),
  ...sections('src/font/index.js', 'ssw.ttf.font', './font/', 'font'),
  ...sections('src/fsw/index.js', 'ssw.ttf.fsw', './fsw/', 'fsw'),
  ...sections('src/swu/index.js', 'ssw.ttf.swu', './swu/', 'swu')
];
