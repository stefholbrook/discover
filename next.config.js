const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
  reactStrictMode: true,
  env: {
    RXDB_NAME: process.env.RXDB_NAME,
    RXDB_PASSWORD: process.env.RXDB_PASSWORD,
  },
})
