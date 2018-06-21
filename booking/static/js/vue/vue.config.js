module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    port: 8888, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
}