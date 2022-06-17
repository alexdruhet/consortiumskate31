module.exports = [
  {
    resolve: "gatsby-source-contentful",
    options: {
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      spaceId: process.env.CONTENTFUL_SPACE_ID,
    },
  },
  "gatsby-plugin-postcss",
  {
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: process.env.GA_TRACKING_ID,
    },
  },
  "gatsby-plugin-image",
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sitemap",
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      icon: "src/assets/images/icon-consortiumskate31.png",
    },
  },
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: "./src/assets/images/",
    },
    __key: "images",
  },
];
