module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === "production" ? "/cloud-storage-client/" : "/"
}
