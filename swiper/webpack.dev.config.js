const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry:path.resolve(__dirname,'src/index.jsx'),
  output:{
    filename:'bundle.js'
  },
  module:{
    loaders:[
      {test:/\.(js|jsx)?$/,exclude:/node_modules/,loader:'babel-loader',query:{presets:['es2015','stage-0','react']}},
      {test:/\.less$/,exclude:/node_modules/,loader:'style-loader!css-loader!postcss-loader!less-loader'},
      {test:/\.css$/,exclude:/node_modules/,loader:'style-loader!css-loader!postcss-loader'},
      {test:/\.(png|gif|jpg|jpeg|bmp)$/i,loader:'url-loader?limit=5000'},
      {test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,loader:'url-loader?limit=5000'}
    ]
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  plugins:[
    new OpenBrowserPlugin({
      url:'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
      template:__dirname+'/src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
    })
  ],
  devServer:{
    inline:true,
    hot:true,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:true
      }
    }
  }
};
module.exports = config;
