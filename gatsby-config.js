module.exports = {
  siteMetadata: {
    title: `UK Covid Dashboard`,
    description: `Compare Covid Rates Across the UK`,
    author: `@kilowatts.io`,
    siteUrl: "https://covid-comparison.kilowatts.io",
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
    `gatsby-plugin-sitemap`,
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
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: "https://77ae5ea8eb064018865e9aa358885e5a@o490815.ingest.sentry.io/5610961",
        sampleRate: 0.7,
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-8732331398808870`
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
