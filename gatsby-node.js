exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.bib(tex)?$/,
          use: require.resolve('bibtex-loader'),
        },
      ],
    },
  })
}