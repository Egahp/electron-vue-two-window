const glob = require('glob');
const path = require('path');
const WINDOW_PATH = path.resolve(__dirname, '../src/renderer/windows');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.entries = function () {
    /*用于匹配 pages 下一级文件夹中的 index.js 文件 */
    var entryFiles = glob.sync(WINDOW_PATH + '/*/main.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        /* 下述两句代码用于取出 windows 下一级文件夹的名称 */
        var entryPath = path.dirname(filePath)
        var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
        /* 生成对应的键值对 */
        map[filename] = filePath
    })
    console.log(map);
    return map
}

exports.htmlPlugin = function () {
    let entryHtml = glob.sync(WINDOW_PATH + '/*/index.ejs')
    let arr = []
    entryHtml.forEach((filePath) => {
        var entryPath = path.dirname(filePath)
        var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
        let conf = {
            template: filePath,
            filename: filename + `/index.html`,
            chunks: ['manifest', 'vendor', filename],
            inject: true,
            nodeModules: path.resolve(__dirname, '../node_modules')
        }
        if (process.env.NODE_ENV === 'production') {
            let productionConfig = {
                minify: {
                    removeComments: true,         // 移除注释
                    collapseWhitespace: true,     // 删除空白符和换行符
                    removeAttributeQuotes: true   // 移除属性引号 
                },
                chunksSortMode: 'dependency'    // 对引入的chunk模块进行排序
            }
            conf = { ...conf, ...productionConfig } //合并基础配置和生产环境专属配置
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    console.log(arr)
    return arr
}