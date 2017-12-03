const path = require('path');
const package = require('./package.json');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry:{
    app:path.resolve(__dirname,'src/index.jsx'),
    vendor:Object.keys(package.dependencies)
  },
  output:{
    path:__dirname+'/build',
    filename:'js/[name][hash:8].js',
    publicPath:'./'
  },
  devtool:'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module:{
    loaders:[
      //处理js
      {
        test:/\.(js|jsx)?$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        //依赖
        query:{
          presets:['es2015','react','stage-0']
        }
      },
      //处理less
      {
        test:/\.less$/,
        exclude:/node_modules/,
        loader:ExtractTextWebpackPlugin.extract({
          fallback:'style-loader',
          use:'css-loader!postcss-loader!less-loader'
        })
      },
      //处理css
      {
        test:/\.css$/,
        exclude:/node_modules/,
        loader:ExtractTextWebpackPlugin.extract({
          fallback:'style-loader',
          use:'css-loader!postcss-loader'//?name=../images/[hash:8].[name].[ext]'
        })
      },
      //处理图片
      {
        test:/\.(png|gif|jpg|jpeg|bmp)$/,
        exclude:/node_modules/,
        loader:'url-loader',//?limit=5000&name=./images/[name].[hash:8].[ext]
        query:{
          limit:5000,
          name:'images/[name].[hash:8].[ext]',
          //outputPath:'../'
          //useRelativePath:true
        }
      },
      {
        //处理字体
        test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
        loader:'url-loader',
        query:{
          limit:5000,
          name:'fonts/[name][hash:8].[ext]'
        }
      }
    ]
  },
  plugins:[
    //BannerPlugin
    new webpack.BannerPlugin("Copyright by wangyan"),
    //clean file
    new CleanWebpackPlugin(['build/']),
    //html 模板
    new htmlWebpackPlugin({
      template:__dirname + '/src/index.html'
    }),
    //为组件分配ID，分析和优先考虑使用最多的模块，并为他们分配最小id
    new webpack.optimize.OccurrenceOrderPlugin(),
    //代码混淆压缩
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        // 去除警告代码
        warnings:false
      },
      // sourceMap: true//,
      // mangle: true
    }),
    //分离css
    new ExtractTextWebpackPlugin('./[name].[hash:8].css'),
    //提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename:'/js/[name].[hash:8].js'
    }),
    new webpack.DefinePlugin({
      //react
      'process.env':{
        'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
      },
      // 可在业务js代码中使用__DEV__判断是否是dev模式
      __DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
    })
  ]
};