/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://zanmvula.co.za", // Replace with your actual domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  exclude: [],
  additionalPaths: async (config) => {
    return [
      await config.transform(config, "/store"),
      await config.transform(config, "/sizing"),
      await config.transform(config, "/about"),
      await config.transform(config, "/contact"),
    ];
  },
};
