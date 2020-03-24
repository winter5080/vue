const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


//在内存中，根据制定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注册到页面底部
//如果要配置插件，需要在导出的对象中，挂在一个plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')
//当以命令行形式运行webpack或者webpack-dev-server的时候，工具会发现，我们没有提供要打包的文件的入口和出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建
module.exports = {
  entry: './src/main.js',//打包的入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),   //输出文件目录
    filename: 'bundle.js'//输出的文件名字
  },
  mode: 'development',//设置mode
  plugins:[//所有webpack插件的配置节点
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),//制定模板路径
      filename: 'index.html' //设置生成的内存页面名称
    }),
    
  ],

 
  module:{//这个节点，用于配置第三方模块加载器
    rules:[//所有地方模块匹配规则
      {test:/\.css$/, use:['style-loader','css-loader']},//配置处理.css文件的第三方loader规则。  前面是正则表达式/\.css$/
      //调用规则是从右到左，先调用CSS-loader在处理style-loader，再处理结果给webpack
      {test:/\.less$/, use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},
      {test:/\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=13240&name=[hash:8]-[name].[ext]'},
      //处理图片路径的loader
      //limit给定的值，是图片的大小，单位是byte，如果我们引用的图片大于或者等于给定的limit值，如果图片小于给定的limit值，则会转为Base64的值
      {test: /\.(ttf|eot|svg|woff|woff2$)/, use: 'url-loader'},//处理字体文件的loader
      {test: /\.js$/, use:'babel-loader', exclude:/node_modules/},//配置Babellai 来转换高级语言
      {test: /\.vue$/, use:'vue-loader'},
    ]
  },
  resolve: {
    alias:{
        'vue$':'vue/dist/vue.js'//导入vue完整包
    }
}
};