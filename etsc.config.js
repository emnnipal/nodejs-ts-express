const esbuildPluginTsc = require('@emarketeer/esbuild-plugin-tsc');

module.exports = {
  esbuild: {
    entryPoints: ['./src/index.ts'],
    minify: false,
    // to enable emitDecoratorMetadata for reflect-metadata
    plugins: [esbuildPluginTsc({ force: true })],
  },
};
