# 快速开始

本节将讲述如何在自己的工程中安装组件库并使用。

::: info
推荐使用node > 16.0.0版本
:::

## 安装方式
前端工程使用包管理工具进行安装，以npm为例

````shell
npm i qms-components --registry=http://nexus.faw-vw.in/repository/npm_public

````

## 完整引入
在质保一体化前端子工程 main.js 文件中

```js
// 质保一体化平台公共组件库
import qmsComponent from 'qms-components'
 
// 在此函数中进行挂载
const render = (props) => {
 
  app.use(qmsComponent)
 
}
```
## Repo地址：

 [组件库源码](https://gitlab.faw-vw.com/qa038/qms-front-components/-/tree/dev/).
