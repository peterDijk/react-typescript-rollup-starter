import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { generateSW } from 'rollup-plugin-workbox';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/index.tsx',
  output: {
    file: `dist/app.bundle.js`,
    format: 'iife',
    name: 'bundle',
    exports: 'named',
    sourcemap: true,
    //    treeshake: production
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // 'process.env.PUBLIC_URL': JSON.stringify('https://'),
    }),
    htmlTemplate({
      template: './template.html',
      target: 'index.html',
    }),
    postcss({
      plugins: [require('tailwindcss')],
    }),
    json(),
    nodeResolve({ preferBuiltins: true, browser: true }),
    typescript(),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['node_modules/process-es6/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
          'useState',
          'useEffect',
        ],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
    globals(),
    builtins(),
    babel({
      presets: ['@babel/env'],
      extensions: ['.ts', '.js'],
    }),
    generateSW({
      swDest: 'dist/service-worker.js',
      globDirectory: 'dist',
    }),
    copy({
      targets: [
        {
          src: 'src/images',
          dest: 'dist',
        },
      ],
    }),
    uglify(),
    !production &&
      (serve({
        contentBase: './dist',
        open: true,
        host: 'localhost',
        port: 3000,
      }),
      livereload({
        watch: 'dist',
      })),
  ],
};
