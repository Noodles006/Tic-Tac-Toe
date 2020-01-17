const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // mode: 'development',
    module: {
    	rules: [
    		{
    			test: /\.jsx?$/,
    			exclude: /node_modules/,
    			use: {
    				loader: 'babel-loader'
    			}
    		},
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader', // 将 CSS 转化成 CommonJS 模块
                    'sass-loader' // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            },
    		{
    			test: /\.html$/,
    			use: [
    				{
    					loader: 'html-loader',
    					options: {
    						minimize: true
    					}
    				}
    			]
    		}
    	]
    },
    plugins: [
    	new HtmlWebPackPlugin({
    		template: './src/index.html',
    		filename: 'index.html'
    	})
    ]
};