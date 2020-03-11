module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? require('./src/custom.conf.json').publicPath
      : '/'
};
