import typescript from "rollup-plugin-typescript2";
import replace from "rollup-plugin-replace";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload';
import htmlTemplate from "rollup-plugin-generate-html-template";
import {
  uglify
} from "rollup-plugin-uglify";
import copy from "rollup-plugin-copy";
import babel from "rollup-plugin-babel";
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.tsx",
  output: {
    file: `dist/app.bundle.js`,
    format: "iife",
    name: "bundle",
    exports: "named",
    sourcemap: true,
    //    treeshake: production
  },
  plugins: [
    postcss({
      plugins: [
        require('tailwindcss')
      ]
    }),
    nodeResolve(),
    typescript({
      objectHashIgnoreUnknownHack: true
    }),
    commonjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/process-es6/**"],
      namedExports: {
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "useState",
          "useEffect"
        ],
        "node_modules/react-dom/index.js": ["render"]
      }
    }),
    babel({
      presets: ["@babel/preset-env"]
    }),
    htmlTemplate({
      template: "./template.html",
      target: "index.html"
    }),
    copy({
      targets: [
        // { src: "src/css", dest: "dist" },
        {
          src: "src/images",
          dest: "dist"
        }
      ]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    uglify(),
    !production &&
    (
      serve({
        contentBase: "./dist",
        open: true,
        host: "localhost",
        port: 4000
      }),
      livereload({
        watch: 'dist'
      })
    )
  ]
};