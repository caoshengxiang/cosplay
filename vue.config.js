const path = require('path')
const webpack = require('webpack')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 项目部署基础
// 默认情况下，应用将被部署在域的根目录下,
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
// const webpack = require('webpack')

module.exports = {
  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }])
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: true,
  runtimeCompiler: true,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     '/': {
  //       target: 'http://172.16.101.109:2345',
  //       changeOrigin: true,
  //       ws: false, // 关闭websocket服务
  //       pathWrite: {
  //         '^/': '/',
  //       },
  //     },
  //   },
  // },
  // configureWebpack: {
  //   plugins: [
  //     // new webpack.ProvidePlugin({
  //     //   $: 'jquery',
  //     //   jQuery: 'jquery',
  //     //   'windows.jQuery': 'jquery',
  //     // }),
  //     new PrerenderSpaPlugin(
  //       // 编译后的html需要存放的路径
  //       path.join(__dirname, '../dist'),
  //       // 列出哪些路由需要预渲染
  //       ['/', '/login']
  //     )
  //   ],
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        // new PrerenderSpaPlugin({
        //   // 生成文件的路径，也可以与webpakc打包的一致。
        //   // 下面这句话非常重要！！！
        //   // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        //   staticDir: path.join(__dirname, 'dist'),
        //   // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        //   // routes: ['/', '/test/1', '/web/', '/web/about/', '/web/contact/'], // 这里有个坑，如果是子路由，就把父路由也写上 /web/
        //   // 这个很重要，如果没有配置这段，也不会进行预编译
        //   renderer: new Renderer({
        //     inject: {
        //       foo: 'bar'
        //     },
        //     headless: false,
        //     // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
        //     renderAfterDocumentEvent: 'render-event'
        //   })
        // }),
      ],
    }
  },
  pluginOptions: {
    pwa: {
      iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
      }
    }
  }
}
