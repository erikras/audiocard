import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const input = './compiled/index.js'
const external = (id) => !id.startsWith('.') && !path.isAbsolute(id)
const replacements = [{ original: 'lodash', replacement: 'lodash-es' }]
const babelOptions = {
  exclude: /node_modules/,
  plugins: [
    'annotate-pure-calls',
    'dev-expression',
    ['transform-rename-import', { replacements }],
  ],
}

const buildUmd = ({ env }) => ({
  input,
  external: ['react'],
  output: {
    name: 'AudioCard',
    format: 'umd',
    sourcemap: true,
    file: `./dist/audiocard.umd.${env}.js`,
    exports: 'named',
    globals: {
      react: 'React',
    },
  },

  plugins: [
    resolve(),
    babel(babelOptions),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
    sourceMaps(),
    sizeSnapshot(),
    env === 'production' &&
      terser({
        output: { comments: false },
        compress: {
          keep_infinity: true,
          pure_getters: true,
        },
        warnings: true,
        ecma: 5,
        toplevel: false,
      }),
  ],
})

const buildCjs = ({ env }) => ({
  input,
  external,
  output: {
    file: `./dist/${pkg.name}.cjs.${env}.js`,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    sourceMaps(),
    sizeSnapshot(),
    env === 'production' &&
      terser({
        output: { comments: false },
        compress: {
          keep_infinity: true,
          pure_getters: true,
        },
        warnings: true,
        ecma: 5,
        toplevel: true,
      }),
  ],
})

export default [
  buildUmd({ env: 'production' }),
  buildUmd({ env: 'development' }),
  buildCjs({ env: 'production' }),
  buildCjs({ env: 'development' }),
  {
    input,
    external,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), babel(babelOptions), sizeSnapshot(), sourceMaps()],
  },
]
