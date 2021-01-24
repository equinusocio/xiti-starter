/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    _output: { url: '/', static: true },
    assets: { url: '/static' },
  },
  plugins: [
    "@snowpack/plugin-postcss",
    ['@snowpack/plugin-run-script', { cmd: 'eleventy', watch: '$1 --watch --quiet' }],

  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    "preload": true,
    "splitting": true,
    "treeshake": true,
    "bundle": true,
    "minify": true,
    "target": 'es2018'
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    // Eleventy updates multiple files at once, so add a 300ms delay before we trigger a browser update
    hmrDelay: 300,
  },
  buildOptions: {
    /* ... */
  },
};
