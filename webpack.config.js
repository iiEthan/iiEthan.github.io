import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/entry.js',
  output: {
    filename: '[name]-bundle.js',
    clean: true,
    assetModuleFilename: 'images/[name][ext]'
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/main/index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { 
        test: /\.css$/, 
        use: ["style-loader", "css-loader"] 
      },
      { 
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
    ]
  },
};
