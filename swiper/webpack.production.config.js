const webpack = require('webpack');
const path = require('path');
const package = require('../package.json');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry:{
    app:path.resolve(__dirname,'src/index.jsx'),
    vendor:Object.keys(package.dependencies)
  },
  output:{
    path:__dirname+'/build',
    filename:'js/[name][hash:8].js',
    publicPath:'./'
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  devtool:'inline-source-map',
  module:{
    loaders:[
      {test:/\.(js|jsx)?$/,exclude:/node_modules/,loader:'babel-loader',query:{presets:['es2015','stage-0','react']}},
      {
    test:/\.less$/,
    exclude:/node_modules/,
    loader:ExtractTextWebpackPlugin.extract({
        fallback:'style-loader',
        use:[
          {
            loader:'css-loader',
            options:{
              minimize: true //css压缩
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      })
},
{
    test:/\.css$/,
    exclude:/node_modules/,
    loader:ExtractTextWebpackPlugin.extract({
        fallback:'style-loader',
        use:'css-loader!postcss-loader'
      })
 },
      {test:/\.(png|gif|bmp|jpg|jpeg)$/,exclude:/node_modules/,loader:'url-loader',query:{
        limit:5000,//5k
        name:'images/[name].[hash:8].[ext]'
      }},
      {test:/\.(png|woff|woff2|svg|tto|eot|ttf)($|\?)/i,exclude:/node_modules/,loader:'file-loader',query:{
        limit:5000,
        name:'fonts/[name].[hash:8].[ext]'
      }}
    ]
  },
  plugins:[
    new webpack.BannerPlugin('cooyright by wangyan'),
    new CleanWebpackPlugin(['build/']),
    new HtmlWebpackPlugin({
      template:__dirname+'/src/index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings:false
      }//,
      // sourceMap:true,
      // mangle:true
    }),
    new ExtractTextWebpackPlugin('./[name][hash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename:'js/[name][hash:8].js'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify(process.env.NODE_ENV)
      },
      __DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
    })
  ]
};

module.exports = config;
