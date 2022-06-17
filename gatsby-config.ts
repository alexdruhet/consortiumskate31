import type { GatsbyConfig } from "gatsby";

import * as dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: require("./config/site-metadata"),
  graphqlTypegen: true,
  plugins: require("./config/plugins")
};

export default config;
