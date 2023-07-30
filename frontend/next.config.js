/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  compiler: {
    relay: {
      src: './src',
      language: 'typescript',
      artifactDirectory: './src/__generated__',
    },
  },

  //  TODO: Danger! Useful but may want to turn these off later.
  productionBrowserSourceMaps: true,

  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
};
