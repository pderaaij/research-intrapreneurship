module.exports = {
  pathPrefix: `/secondbrain`,
  siteMetadata: {
    title: `Research digital garden`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        basePath: "/",
        rootNote: "/README",
        contentPath: `${__dirname}/../literature-review`,
        // ignore: [
        //   "**/_layouts/**",
        //   "**/.git/**",
        //   "**/.github/**",
        //   "**/.vscode/**",
        //   `${__dirname}/../compile-metadata/**`,
        //   `${__dirname}/../.correspondence/**`,
        //   `${__dirname}/../report/**`,
        //   `${__dirname}/../thesis/**`,
        // ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-obsidian",
            options: {
              titleToURL: (title) => `/notes/${title.replace(/\\/g, "")}`,
              stripBrackets: true,
            },
          },
        ],
      },
    },
    {
      // this plugin makes sure your static files will be served by gatsby,
      // if you have multiple directories, copy this plugin section and specify other directory
      // check https://github.com/csath/gatsby-plugin-copy-files-enhanced to find docs for this plugin
      resolve: "gatsby-plugin-copy-files-enhanced",
      options: {
        source: `${__dirname}/../literature-review/assets`,
        destination: "/assets",
        purge: true,
      },
    },
  ],
};
