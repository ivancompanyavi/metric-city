import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const devEnv = process.env.ROLLUP_WATCH === 'true'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'es',
  },
  plugins: [resolve(), devEnv && serve('public'), devEnv && livereload()],
}
