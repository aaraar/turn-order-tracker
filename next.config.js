module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      loader: 'svg-sprite-loader',
      options: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    });

    return config;
  }
};
