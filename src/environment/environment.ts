export const environment = {
  mock: true,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? require('@/custom.conf.json').publicPath
      : '/'
};
