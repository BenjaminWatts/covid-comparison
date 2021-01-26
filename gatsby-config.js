module.exports = {
  siteMetadata: {
    title: `UK Covid Dashboard`,
    description: `Compare Covid Rates Across the UK`,
    author: `@kilowatts.io`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-antd",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Covid Comparison`,
        short_name: `covid-comparison`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `virus.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
