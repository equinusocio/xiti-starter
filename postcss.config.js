module.exports = {
  plugins: [
    // https://preset-env.cssdb.org
    require('postcss-preset-env')({
      stage: 0,
    }),
    // https://cssnano.co
    require('cssnano')({
      preset: [
        // https://cssnano.co/docs/presets
        // https://cssnano.co/docs/what-are-optimisations#what-optimisations-do-you-support
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: false,
        },
      ],
    }),
  ],
}
