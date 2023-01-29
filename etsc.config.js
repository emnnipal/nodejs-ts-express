const esbuildPluginTsc = require('@emarketeer/esbuild-plugin-tsc');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  esbuild: {
    entryPoints: ['./src/index.ts'],
    minify: false,
    // to enable emitDecoratorMetadata for reflect-metadata
    plugins: [esbuildPluginTsc({ force: true })],
  },
  postbuild: async () => {
    const cpy = (await import('cpy')).default;
    await cpy(
      [
        'src/**/*.json', // Copy all .json files
        '!src/**/*.{tsx,ts,js,jsx}', // Ignore already built files
      ],
      compilerOptions.outDir || 'dist'
    );
  },
};
