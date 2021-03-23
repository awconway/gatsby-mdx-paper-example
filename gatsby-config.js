const remarkCitations = require('remark-citations')

module.exports = {
  siteMetadata: {
    title: `Articles`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'references',
        path: `${__dirname}/src/references`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [remarkCitations],
        gatsbyRemarkPlugins: [`gatsby-remark-sectionize`,
          `gatsby-remark-sub-sup`],
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: 'popper',
        id: 'popper',
      },
    },
  ],
}
