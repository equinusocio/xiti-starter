/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* https://www.snowpack.dev/reference/configuration#mount */
    _output: { url: '/', static: true },
    assets: { url: '/static' },
  },
  plugins: [
    /* https://www.snowpack.dev/reference/configuration#plugins */
    "@snowpack/plugin-postcss",
    ['@snowpack/plugin-run-script', { cmd: 'eleventy', watch: '$1 --watch --quiet' }],

  ],
  routes: [
    /* https://www.snowpack.dev/guides/routing#nav-primary
     * Enable an SPA Fallback in development:
     * {"match": "routes", "src": ".*", "dest": "/index.html"},
     */
  ],
  optimize: {
    /* https://www.snowpack.dev/guides/optimize-and-bundle#option-1%3A-built-in-optimizations */
    "preload": true,
    "splitting": true,
    "treeshake": true,
    "minify": true,
    "target": 'es2018'
  },
  packageOptions: {
    /* https://www.snowpack.dev/reference/configuration#packageoptions */
  },
  devOptions: {
    // Eleventy updates multiple files at once, so add a 300ms delay before we trigger a browser update
    hmrDelay: 300,
  },
  buildOptions: {
    /* https://www.snowpack.dev/reference/configuration#buildoptions */
  },
};
