import path from 'path';
import webpack from 'webpack';

export default {
  entry: './public/main/index.html',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
