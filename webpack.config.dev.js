const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry:path.resolve(__dirname,'src/index.jsx'),
  output:{
    filename:'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // devtool:'inline-source-map',
  module:{
    loaders:[
      {
        test:/\.(js|jsx)?$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query: {  
            presets: ['es2015','react','stage-0']
        }
      },{
        test:/\.less$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader!less-loader!postcss-loader'
      },{
        test:/\.css$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader!postcss-loader'
      },{
        test:/\.(png|gif|jpg|jpeg|bmp)$/i,
        loader:'url-loader?limit=5000' // 限制大小小于5k
      },{
        test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
        loader:'url-loader?limit=5000' // 限制大小小于5k
      }
    ]
  },
  plugins:[
    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
      template:__dirname + '/src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 可在业务js代码中使用__DEV__判断是否是development environment.
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
    })
  ],
  devServer:{
    // contentBase: './',
    inline:true,
    hot:true,
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 express 提供 mock 数据。
      // express 代码在 ./mock 目录中，启动命令为 npm run mock
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
