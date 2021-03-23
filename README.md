# gatsby-mdx-paper-example

An example article using Gatsby + MDX based on this [repo](https://github.com/hubgit/gatsby-mdx-paper-example).

Modifications include:
- pulled in the components from [react-paper](https://github.com/hubgit/react-paper) needed to produce the citations and bibliography so that styling built-in from react-paper can be modified more easily (no author details etc) for new projects
- used gatsby-remark-sectionize and gatsby-remark-sub-sup plugins
- uses gatsby-plugin-mdx to create pages with the layout component containing the `BibliographyProvider` component for all mdx pages