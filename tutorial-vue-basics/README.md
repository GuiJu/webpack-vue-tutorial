上一个例子里面，我们介绍了webpack的laoder和plugin。

这节介绍如何使用loader和plugin来进行vue的模块化开发。

在之前网页中用vue时，都是在html中引入vue.js这个库，然后直接在页面里写一些vue的代码。

但是这样无法进行模块化开发。还是一样的道理，因为浏览器不支持模块化。

所以vue模块化开发单页面应用时，都是在xxx.vue这种类型的文件里进行开发的，举个官网的例子：

![](../assets/vue-component.png)

上面就是一个.vue文件。上面的`<template>`标签里写html代码。中间`<script>`里写js代码，下面写css代码。

然后`<script>`标签里进行模块的导出。

那么怎么让webpack解析.vue文件呢？这就要用到vue提供的loader和plugin了，它叫做Vue Loader。配置步骤如下：

首先安装`vue-loader`和`vue-template-compiler`两个包(-D 等于 --save-dev)：
```
npm install -D vue-loader vue-template-compiler
```

安装后，在webpack.config.js中进行配置，首先引入`VueLoaderPlugin`：
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
```

然后，既然我们要处理.vue文件，和处理.css文件一个道理，我们也要配置对应的规则，让webpack碰到.vue文件就去用`vue-loader`进行处理：
```js
rules: [
  // ... 其它规则
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  }
]
```

最后，再引入一个插件即可：
```js
plugins: [
    // ...
    new VueLoaderPlugin()
]
```

另外在webpack中配置mode为'development'，表示我们在开发模式，配置之后的webpack.config.js文件：
```js
const path = require('path');
// 引入webpack
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 新加入的内容
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 新加入的内容
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      TEACHER: JSON.stringify('lingtao'),
    }),
    // 新加入的内容
    new VueLoaderPlugin()
  ]
};
```

现在，我们可以开始使用.vue文件进行模块化的开发了。

另外，此处有个坑，vue和vue-loader的版本要一致，所以我们运行下面的命令，重新安装跟vue-loader版本一致的vue版本：
```js
npm uninstall vue
npm install vue@2.6.9
```
最后，再删除src中的js文件，改为两个用于vue运行的index.js和App.vue即可：
```js
// index.js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
})

```

```js
// App.vue
<template>
  <div>
    <p>Hello {{name}} !</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'ZYH'
    }
  }
}
</script>

<style>
p {
  color: pink;
}
</style>
```

运行`npm run build`，打开页面即可看到效果。

