const esbuildPluginTsc = require('@emarketeer/esbuild-plugin-tsc');

module.exports = {
  esbuild: {
    entryPoints: ['./src/index.ts'],
    minify: false,
    plugins: [esbuildPluginTsc({ force: true })],
  },
};
