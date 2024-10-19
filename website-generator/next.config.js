/** @type {import('next').NextConfig} */

const path = require("path");
//console.log("*** IN CONFIG ***");

let DIST_DIR = "out";

if (process.env.DIST_DIR) {
  DIST_DIR = process.env.DIST_DIR;
} else if (process.env.WEBSITE_ID) {
  DIST_DIR = path.join("out", process.env.WEBSITE_ID);
}

/*
const DIST_DIR = process.env.WEBSITE_ID
  ? path.join("out", process.env.WEBSITE_ID)
  : "out";
*/

DIST_DIR = "../charmianstewart.com";

console.log("DIST_DIR " + DIST_DIR);

const nextConfig = {
  output: "export",

  distDir: DIST_DIR,

  /*
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals = config.externals.concat([
      "better-sqlite3",
      "tedious",
      "mysql",
      "mysql2",
      "oracledb",
      "pg-query-stream",
      "sqlite3",
    ]);
    return config;
  },
  */
};

module.exports = nextConfig;
