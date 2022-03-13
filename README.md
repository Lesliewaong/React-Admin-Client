# react实战全栈后台

项目预览：http://lesliewaong.top/react-admin-client/

## 准备

### 项目描述

1) 此项目为一个**前后台分离**的**后台管理的 SPA**（单页面应用）, 包括前端 PC 应用和后端应用
2) 包括**用户管理** / **商品分类管理** / **商品管理** / **权限管理**等功能模块
3) 前端: 使用 **React 全家桶（函数式组件、react-router V6）** + **Antd（v4）** + **Axios** + **ES6** + **Webpack** 等技术
4) 后端: 使用 **Node** + **Express** + **Mongodb** 等技术
5) 采用**模块化**、**组件化**、**工程化**的模式开发

### 技术选型

[![oDk4ZF.png](https://s4.ax1x.com/2021/12/05/oDk4ZF.png)](https://imgtu.com/i/oDk4ZF)

### 项目结构

```js
public ---- 静态资源文件夹
	css ------ 和风天气图标字体
	favicon.icon ------ 网站页签图标
	index.html -------- 主页面
	logo192.png ------- logo图
	logo512.png ------- logo图
	manifest.json ----- 应用加壳的配置文件
	robots.txt -------- 爬虫协议文件
src ---- 源码文件夹
	>api -------- ajax相关
    >assets -------- 公用资源
    >components -------- 非路由组件
    >config -------- 配置
    >hooks -------- 自定义hook
    >pages -------- 路由组件
    >utils -------- 工具模块
	App.css -------- App组件的样式
	App.js --------- App组件
	index.js ------- 入口文件
```

### 前端路由

```js
>pages -------- 路由组件
	/login --- 登录
	/ ----主页面
		index --- 主路由 home
		/category --- 分类管理
        /product  --- 商品管理
        	index --- 主路由
        	/detail --- 详情
        	/addupdate --- 添加/更新
        /user --- 用户管理
        /role --- 角色管理
        /charts-bar --- 柱状图
        /charts-pie --- 饼图
        /charts-line --- 线图
	* --- 404         
```

### 接口

[![I0hMlt.jpg](https://z3.ax1x.com/2021/11/11/I0hMlt.jpg)](https://imgtu.com/i/I0hMlt)

### npm/yarn 常用命令

```bash
## 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org
yarn config set registry https://registry.npm.taobao.org
## 初始化项目:
yarn init -y
npm init -y
## 下载项目的所有声明的依赖:
yarn 
npm install
## 下载指定的运行时依赖包:
yarn add webpack@3.2.1
npm install webpack@3.2.1 -S
## 下载指定的开发时依赖:
yarn add webpack@3.2.1 -D
npm install webpack@3.2.1 -D
## 全局下载指定包:
yarn global add webpack
npm install webpack -g
## 删除依赖包:
yarn remove webpack
npm remove webpack -S
yarn global remove webpack
npm remove webpack -g
## 运行项目中配置的script:
yarn run xxx
npm run xxx
## 查看某个包的信息:
yarn info xxx
npm info xxx
```

### git 常用基本命令

```bash
git config --global user.name "username" //配置用户名
git config --global user.email "xx@gmail.com" //配置邮箱
git init //初始化生成一个本地仓库
git add . //添加到暂存区
git commit –m "注释语句" //提交到本地仓库
git remote add origin url //关联到远程仓库
git push origin master //推送本地master分支到远程master分支
git checkout -b dev //创建一个开发分支并切换到新分支
git push ogigin dev //推送本地dev 分支到远程dev 分支
git pull origin dev //从远程dev 分支拉取到本地dev 分支
git clone url //将远程仓库克隆下载到本地
git checkout -b dev origin/dev // 克隆仓库后切换到dev 分支
```

## 应用开发详解

### 开启项目开发

使用`create-react-app`(脚手架)搭建项目

`create-react-app` 是react 官方提供的用于搭建基于`react`+`webpack`+`es6` 项目的脚手架

```bash
# 全局下载工具
npm install -g create-react-app 
# 下载模板项目
create-react-app react-admin-client 
cd react-admin-client
```

编码测试与打包发布项目

```bash
# 编码, 自动编译打包刷新(live-reload), 查看效果
npm start
# 不一定3000
访问: localhost:3000
# 打包发布
npm run build
npm install -g serve
serve build
```

### git管理项目

```bash
1). 创建远程仓库
2). 创建本地仓库
    a. 配置.gitignore
    b. git init
    c. git add .
    d. git commit -m "init"
3). 将本地仓库推送到远程仓库
    git remote add origin url
    git push origin master
4). 在本地创建dev分支, 并推送到远程
    git checkout -b dev
    git push origin dev
5). 如果本地有修改
    git add .
    git commit -m "xxx"
    git push origin dev
6). 新的同事: 克隆仓库
    git clone url
    git checkout -b dev origin/dev
    git pull origin dev
7). 如果远程修改
    git pull origin dev
```

### 项目源码基本目录设计

```js
src ---- 源码文件夹
	>api -------- ajax相关
    >assets -------- 公用资源
    >components -------- 非路由组件
    >config -------- 配置
    >hooks -------- 自定义hook
    >pages -------- 路由组件
    >utils -------- 工具模块
	App.js --------- App组件
	index.js ------- 入口文件
```

### 引入antd

`antd` 是基于 Ant Design 设计体系的 **React UI 组件库**，主要用于研发企业级中后台产品。

`craco`一个对 create-react-app 进行**自定义配置**的社区解决方案

#### 下载安装

`yarn add antd` 安装 antd
`yarn add @craco/craco` 安装 craco
`yarn add craco-less` 下载 less ，支持 less 格式文件

#### package.json 中修改属性

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
},
```

#### 根目录创建 craco.config.js 文件

```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

#### 引入 less 文件

在 src 目录下的 index.js 文件中

```js
import 'antd/dist/antd.less'
```

#### 某个组件中使用antd组件

```jsx
import {Button} from 'antd'
render(){
	return(
		<div>
			<Button>点击一下</Button>
		</div>
	)
}
```

### 引入路由

`yarn add react-router-dom`

### Login组件(不与后台交互)

静态组件

前台表单验证与数据收集

### 运行server 端项目

> 该项目是一个前后台分离的项目: 前台应用与后台应用
>
> 后台应用负责处理前台应用提交的请求, 并给前台应用返回json 数据
>
> 前台应用负责展现数据, 与用户交互, 与后台应用交互

#### 运行后台应用

1) 确保启动`mongodb`服务
2) 启动服务器应用: `npm start`

#### 使用postman工具测试接口

1. postman 是用来测试API 接口的工具

2) postman 可以看作活接口文档

[![I6q0EQ.png](https://z3.ax1x.com/2021/11/14/I6q0EQ.png)](https://imgtu.com/i/I6q0EQ)

### 前后台交互ajax

`yarn add axios`

#### Promise+ async + await 

#### 配置代理

package.json

```json
"proxy": "http://localhost:5000"
```

#### 请求测试: login.jsx

### Login 组件(完成登陆功能)

> 维持登陆与自动登陆

`yarn add store`

store.js 是一个兼容所有浏览器的 **LocalStorage 包装器**，不需要借助 Cookie 或者 Flash。store.js 会根据浏览器自动选择使用 localStorage、globalStorage 或者 userData 来实现本地存储功能。

### Admin 组件(搭建整体结构)

LeftNav组件 Header组件 Admin组件

### Admin 的子路由

注意v6的更改

### LeftNav组件

`defaultOpenKeys={[openKey]}`目前使用`useMemo`实现，后续再优化

### Header 组件

### Home 界面

### 分类管理

`yarn add react-draft-wysiwyg draftjs-to-html draft-js`

## 使用说明

### 模块化、组件化、工程化

#### 模块化

后端：**CommonJS** :`module.exports`、`require`方法用于加载模块。

前端：**ES6** 模块化语法：export 和 import；

#### 工程化

`webpack`最热门的前端资源模块化管理和打包工具、

`create-react-app` 脚手架初始化react 项目开发、

`ESLint`  插件化的 JavaScript 代码检测工具

#### 组件化

其中以React的组件化最为彻底,甚至可以到函数级别的原子组件,高度的组件化可以是我们的工程易于维护、易于组合拓展。

理解:**用来实现局部功能效果的代码和资源的集合(html/css/js/img等等)**

为什么要用组件:一个界面的功能复杂

作用:**复用编码,简化项目编码,提高运行效率**


当应用是以多组件的方式实现,这个应用就是组件化的应用。

### 后端数据

Node + Express + Mongodb等技术。

Node.js 使用 JavaScript 语言开发服务器端应用；Express是基于 Node.js平台，快速、开放、极简的 Web 开发框架；MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

MySQL 是一个开源的关系数据库，其中的数据存于表中，数据中的某些属性可以跟其他表建立关系。

MongoDB 也是开源的，但它属于文档型数据库。因此，它没有记录的概念，它的数据模不固定，所以它是一种动态灵活的数据库，可以插入大量数据。

在选定最佳数据库之前，特定的**业务需求和项目的优先事项**应当是清晰确定的，正如前文提到的，在处理大量数据方面，MongoDB 比 MySQL 更胜一筹。另外，在云计算服务和需求频繁变化的项目上，MongoDB 也是如此。

相反，MySQL 中数据结构和模式是固定的，因此保证了数据一致性和可靠性。使用 MySQL 还有一个好处，就是由于它支持基于 ACID 准则的事务操作，数据安全性更高。所以对于看重这些因素的项目来说，MySQL 是最合适的。

#### MongoDB 的安装与配置

下载：https://www.mongodb.com/try/download/ops-manager

配置path: 将mongodb下的bin目录配置到path环境变量中

#### 添加数据

使用**mongoDB Compass**

连接服务器：`mongodb://localhost/server_db2`

可以手动输入，也可以导入json

### 天气API

#### 和风天气（不需要跨域处理）

get请求

[开发文档](https://dev.qweather.com/)

将和风天气图标安装在你的项目中，包括SVG图标、图标字体等等。

```bash
npm i qweather-icons
```

在public下的HTML引入`<link rel="stylesheet" href="%PUBLIC_URL%/css/qweather-icons.css">`，注意还要导入一个font文件，在对应位置即可使用图标字体显示天气图标。picUrl即请求到的图标的代码。

```jsx
<i className={"qi-"+picUrl+"-fill"} style={{color:'black',fontSize:'17px',margin:'0 15px'}}/>
```

### less

less是一门css的预处理语言

* less是一个css的增强版，通过less可以**编写更少的代码实现更强大的样式**，添加了许多的新特性：像对**变量**的支持、对**mixin**的支持... ...
* less的语法大体上和css语法一致，但是less中增添了许多对css的扩展，所以浏览器无法直接执行less代码，要执行必须向将**less转换为css**，然后再由浏览器执行

特点

* **结构写的更加清晰**
* 变量 `@变量名`
* `&` 表示外层的父元素  `&::after` `&:hover`
* `:extend()` 对当前选择器扩展指定选择器的样式（选择器分组）

### 界面

#### 布局

Flex absolute float

#### 登录界面 

![image-20220313161250827](C:\Users\Lesliewaong\AppData\Roaming\Typora\typora-user-images\image-20220313161250827.png)

> 气泡背景原理：

**background**可以设置多个，默认地，每个背景图像在水平和垂直方向上重复。因此，通过设置多个背景图像的位置和大小产生重叠效果。

气泡：

`radial-gradient`+`rgba`

开始和结束的透明度都设为0。

通过两个确定位置的固定色值（有一定透明度的白色），实现渐变效果。

radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%)

> 边框

`box-shadow`  内外阴影效果。

> 颜色

`transparent` 关键字表示一个完全透明的颜色，即该颜色看上去将是背景色。从技术上说，它是带有阿尔法通道为最小值的黑色，是 `rgba(0,0,0,0)` 的简写。

**RGB**

颜色可以使用红-绿-蓝（red-green-blue (RGB)）模式的两种方式被定义。

RGB颜色可以通过以`#`为前缀的**十六进制字符**和**函数**（`rgb()`、`rgba()`）标记表示。

在CSS 颜色标准 4 中，`rgba()`是`rgb()`的别称。在实行第4级标准的浏览器中，它们接受相同的参数，作用效果也相同。

`rgb[a](R, G, B[, A])`

`rgb[a](R G B[ / A])` CSS 颜色级别 4 支持用空格分开的值。

`R`（红）、`G`（绿）、`B` （蓝）可以是数字或百分比，255相当于100%。`A`（alpha）可以是`0`到`1`之间的数字，或者百分比，数字`1`相当于`100%`（完全不透明）。

**HSL**

颜色也可以使用 `hsl()` 函数符被定义为**色相**-**饱和度**-**亮度**（Hue-saturation-lightness）模式。HSL 相比 RGB 的优点是更加直观：你可以估算你想要的颜色，然后微调。它也更易于创建相称的颜色集合。（通过保持相同的色相并改变亮度/暗度和饱和度）。

HSL 颜色通过功能`hsl()`和`hsla()`符号表示。

从 CSS 颜色级别 4 开始，`hsla()`是`hsl()`在实现 4 级标准的浏览器中，它们接受相同的参数并以相同的方式运行。

`hsl[a](H, S, L[, A])`  `hsl[a](H S L[ / A])`

`H`(hue) 是度数deg，`S`（饱和度）和`L`（亮度）是百分比。

> 背景毛玻璃

`backdrop-filter: blur(5px);`

该属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

> 头像旋转 

`animation`+`transform: rotate`

### 居中布局

#### Flex

`flex + justify-content + align-items`

#### margin

`margin: 0 auto`

#### 图片与文字在一行内的居中问题

父元素开启Flex并设置`align-items: center`，图片可以正常居中，但文字不行，文字（h1中）会自动添加一个下边距，应该是文字与图片对齐方式不同导致的。

一种方法是文字里添加`margin-bottom:0;`

另一种方法是图片和文字采用不同方法居中，父元素开启Flex使它们都在一行，但不设置`align-items: center`，给图片设置`align-self:center;`使其垂直居中，文字设置`line-height值等于父元素的height`。

### 类式组件与函数式组件

> 因为React-Router v6正式版的更新，类式路由组件很多功能不易完成，比如无法直接操作history。另外React-Router官方推荐使用函数式组件。

类式组件

```jsx
import React, { Component } from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
/**
 *  根组件
 */

export default class App extends Component {
    // 自定义方法：赋值语句的形式+箭头函数
    render() {
        //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
        //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
        console.log('render中的this:',this);
        return (
            <Router>
                {/* React-Router v6新特性 <Switch>重命名为<Routes></Routes> 
                   component重命名为element 
                */}
                <Routes> 
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/' element={<Admin/>}></Route>
                </Routes>
            </Router>

        )
    }
}
```

函数式组件

```jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
/**
 *  根组件(函数式)
 */
export default function App() {
    console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
    return (
        <Router>
            {/* React-Router v6新特性 <Switch>重命名为<Routes></Routes> 
                   component重命名为element 
                */}
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/' element={<Admin />}></Route>
            </Routes>
        </Router>

    )
}

```

### React-Router v6 新特性

#### SPA的理解

* 单页Web应用（single page web application，SPA）。
* 整个应用只有**一个完整的页面**。
* 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新。**
* 数据都需要通过ajax请求获取, 并在前端异步展现。

#### 基础使用

React Router v6 大量使用[React hooks](https://reactjs.org/docs/hooks-intro.html)。官方明确推荐**函数式组件**了。

`Routes`是以前 `Switch` 组件的升级版，它包括相对路由和链接、自动路由排名、嵌套路由和布局等功能。

`component`重命名为`element`。

v6的`<Routes>`元素下的所有`<Route path`>和`<Link to>`值都是**自动相对于它们的父路由渲染的**，而且忽略当前URL中的尾部斜杠。头部斜杠代变绝对路径。

中小型项目**嵌套路由可集中显示**，在需要显示的地方使用`<Outlet />`作为占位符。

若**分别显示**，具有后代路由（在其他组件中定义）的路由在其路径中使用尾随`*` 。

“默认子路由”：`index`（不写path）表示索引路由共享父路径。这就是重点——它没有路径。

“未找到”路由：`path='*'`表示路径都不匹配时。具有最弱的优先级。

v6 提供了 **Navigate** 组件，以前版本中的`Redirect`组件也消失了。

```jsx
/**
 *  根组件(函数式)
 */
export default function App() {
    return (
        <Routes>
            <Route path='login' element={<Login />}></Route>
            <Route path='/' element={<Admin />}>
                <Route index element={<Home />} />
                <Route path='category' element={<Category />} />
                <Route path='product' element={<Product />}>
                    <Route index element={<ProductHome />} />
                    <Route path='detail' element={<ProductDetail />} />
                    <Route path='addupdate' element={<ProductAddUpdate />} />
                </Route>
                <Route path='user' element={<User />} />
                <Route path='role' element={<Role />} />
                <Route path="charts-bar" element={<Bar />} />
                <Route path="charts-pie" element={<Pie />} />
                <Route path="charts-line" element={<Line />} />    
            </Route>
            {/* 以上路径都不匹配时 */}
            <Route path='*' element={<NotFound />} />
        </Routes>

    )
}
/**
 * 后台管理的路由组件
 *  */
export default function Admin() {
    const user = memoryUtils.user
    // 如果内存没有存储user ==> 当前没有登陆
    if (!user || !user._id) {
        // 自动跳转到登陆(在render()中) Navigate替代Redirect
        return <Navigate to='/login' />
    }
    return (
        ...     
        <Outlet />{/* 占位符 */}
    	...

    )

}
```

v6 **无法直接访问history实例**，将useHistory更改为 **useNavigate**（兼容性和体验）。

useNavigate返回一个函数用来实现编程式导航。

传入数值进行前进或后退，类似于5.x中的 history.go()方法 `navigate(-1)`

```jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

/**
 * 登录的路由组件(函数式组件)
 * 类式路由组件在onFinish中拿不到history
 *  */
export default function Login() {
    const navigate = useNavigate();


    // 提交表单且数据验证成功后回调事件
    const onFinish = async values => {
			...
            // 跳转到管理界面 (不需要再回退回到登陆)
            navigate('/', { replace: true })
        } else {
            ...
        }

    }
   
    return (
       ...
    )

}
```

v5:**withRouter**高阶组件:包装非路由组件, 返回一个新的组件，新的组件向非路由组件传递3个属性: `history/location/match`

v6:**非路由组件**使用`useLocation`也可得到`location`对象，`withRouter`不再使用。`useLocation().pathname`得到当前路径名。

```jsx
const location =useLocation();
const path = location.pathname;

// location对象
{
    hash: ""
    key: "hvfbi1fy"
    pathname: "/role"
    search: ""
    state: null
}
```

`useRoutes`钩子是一个路由API，它允许你使用**JavaScript对象**而不是React元素来声明和组合路由。

```jsx
function App() {
  let element = useRoutes([
    // 这些与您提供给 <Route> 的props相同
    { path: "/", element: <Home /> },
    { path: "dashboard", element: <Dashboard /> },
    {
      path: "invoices",
      element: <Invoices />,
      // 嵌套路由使用 children 属性，这也与 <Route> 相同
      children: [
        { path: ":id", element: <Invoice /> },
        { path: "sent", element: <SentInvoices /> },
      ],
    },
    // Not found routes work as you'd expect
    { path: "*", element: <NotFound /> },
  ]);

  // 返回的元素将呈现整个元素层次结构及其所需的所有适当上下文
  return element;
}
```

**Link**

标签体内容也是一种特殊的标签属性。

在 v5 中，不以 / 开头的 `<Link to>` 值是不明确的； 这取决于当前的 URL 是什么。 例如，如果当前 URL 是 /users，则 v5 `<Link to="me">` 将呈现 `<a href="/me">`。 但是，如果当前 URL 有一个结尾斜杠，例如 /users/，则相同的 `<Link to="me">` 将呈现 `<a href="/users/me">`。 这使得很难预测链接的行为方式，因此在 v5 中，我们建议您从根 URL（使用 match.url）构建链接，而不是使用相对的 `<Link to>` 值。

React Router v6 修复了这种歧义。 在 v6 中，`<Link to="me">` 将始终呈现相同的 `<a href>`，而不管当前的 URL。

例如，在 `<Route path="users">` 中呈现的 `<Link to="me">` 将始终呈现指向 /users/me 的链接，无论当前 URL 是否具有尾部斜杠。

当您想“向上”链接回父路由时，请在 `<Link to>` 值中使用前导 `..` 段，类似于您在 `<a href>` 中所做的。

```jsx
function App() {
  return (
    <Routes>
      <Route path="users" element={<Users />}>
        <Route path=":id" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

function Users() {
  return (
    <div>
      <h2>
        {/* This links to /users - the current route */}
        <Link to=".">Users</Link>
      </h2>

      <ul>
        {users.map(user => (
          <li>
            {/* This links to /users/:id - the child route */}
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfile() {
  return (
    <div>
      <h2>
        {/* This links to /users - the parent route */}
        <Link to="..">All Users</Link>
      </h2>

      <h2>
        {/* This links to /users/:id - the current route */}
        <Link to=".">User Profile</Link>
      </h2>

      <h2>
        {/* This links to /users/mj - a "sibling" route */}
        <Link to="../mj">MJ</Link>
      </h2>
    </div>
  );
}
```

#### 路由参数传递

##### param参数

- 在`Route组件`中的`path属性`中定义路径参数
- 在组件内通过`useParams` hook访问路径参数

```js
// 定义参数
<BrowserRouter>
    <Routes>
    <Route path='/foo/:id' element={Foo} />
        </Routes>
</BrowserRouter>
// 传递参数
<LinkButton onClick={() => navigate(`addupdate/${product.id}`)} >
    修改
</LinkButton>
// 提取参数
import { useParams } from 'react-router-dom';
export default function Foo(){
    const params = useParams();
    return (
        <div>
        <h1>{params.id}</h1>
        </div>
    )
}
```

 **个人理解：param参数适合传递一个参数时使用。**

**useMatch**()

1. 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

2. 示例代码：

   ```jsx
   <Route path="/login/:page/:pageSize" element={<Login />}/>
   <NavLink to="/login/1/10">登录</NavLink>
   
   export default function Login() {
     const match = useMatch('/login/:x/:y')
     console.log(match) //输出match对象
     //match对象内容如下：
     /*
     	{
         params: {x: '1', y: '10'}
         pathname: "/LoGin/1/10"  
         pathnameBase: "/LoGin/1/10"
         pattern: {
         	path: '/login/:x/:y', 
         	caseSensitive: false, 
         	end: false
         }
       }
     */
     return (
     	<div>
         <h1>Login</h1>
       </div>
     )
   }
   ```

##### search参数&sate参数

Location：这是一个 React Router 特定的对象，它基于内置浏览器的 window.location 对象。 它代表“用户在哪里”。 它主要是 URL 的对象表示，但比这更多。

location state：与 URL 中未编码的位置保持一致的值。 很像哈希或搜索参数（在 URL 中编码的数据），但不可见地存储在浏览器的内存中。

您可以通过两种方式设置`location state`在`<Link>`上或`navigate`上，在下一路由组件中你可以用`useLocation`来访问它。

`useLocation()`既可以获得`state`参数，也可以获得`search`参数。

```jsx
<LinkButton onClick={() => navigate('addupdate?name=tom&age=18', { state: product })} >
    修改
</LinkButton>

const isUpdate = location.state
const search = location.search
console.log(search) // ?name=tom&age=18
console.log(isUpdate) // {status: 1, imgs: Array(2), _id: '5e12b97de31bb727e4b0e349', name: '联想ThinkPad 翼4809', desc: '年度重量级新品，X390、T490全新登场 更加轻薄机身设计9', …}
```

**个人理解：state参数适合传js对象。**

`search`参数一般使用`useSearchParams()`进行获取和修改。

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。
2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

```jsx
const [search,setSearch] = useSearchParams()
const age = search.get('age')
const name = search.get('name')
```

**个人理解：search参数适合传可能会被修改的参数。**

### Antd v3升级成v4

#### 去除 Form.create

v4 的 Form 不再需要通过 `Form.create()` 创建上下文。Form 组件现在自带数据域，因而 `getFieldDecorator` 也不再需要，直接写入 Form.Item 即可：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator } }) => (
  <Form>
    <Form.Item>
      {getFieldDecorator('username', {
        rules: [{ required: true }],
      })(<Input />)}
    </Form.Item>
  </Form>
);

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => (
  <Form>
    <Form.Item name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </Form>
);
```

由于移除了 `Form.create()`，原本的 `onFieldsChange` 等方法移入 Form 中，通过 `fields` 对 Form 进行控制。

#### 表单控制调整

Form 自带表单控制实体，如需要调用 form 方法，可以通过 `Form.useForm()` 创建 **Form 实体**进行操作：

```jsx
// antd v3
const Demo = ({ form: { setFieldsValue } }) => {
  React.useEffect(() => {
    setFieldsValue({
      username: 'Bamboo',
    });
  }, []);

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true }],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      username: 'Bamboo',
    });
  }, []);

  return (
    <Form form={form}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

对于 class component，也可以通过 `ref` 获得实体：

```jsx
// antd v4
class Demo extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      username: 'Bamboo',
    });
  }

  render() {
    return (
      <Form ref={this.formRef}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
```

由于 Form.Item 内置字段绑定，如果需要不带样式的表单绑定，可以使用 `noStyle` 属性移除额外样式：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator } }) => {
  return <Form>{getFieldDecorator('username')(<Input />)}</Form>;
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  return (
    <Form>
      <Form.Item name="username" noStyle>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

#### 字段联动调整

新版 Form 采用增量更新方式，仅会更新需要更新的字段。因而如果有字段关联更新，或者跟随整个表单更新而更新。可以使用 `dependencies`或 `shouldUpdate`。

#### onFinish 替代 onSubmit

对于表单校验，过去版本需要通过监听 `onSubmit` 事件手工触发 `validateFields`。新版直接使用 `onFinish` 事件，该事件仅当校验通过后才会执行：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator, validateFields } }) => {
  const onSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true }],
        })(<Input />)}
      </Form.Item>
    </Form>
  );
};

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
```

#### scrollToField 替代 validateFieldsAndScroll

新版推荐使用 `onFinish` 进行校验后提交操作，因而 `validateFieldsAndScroll` 拆成更独立的 `scrollToField` 方法：

```jsx
// antd v3
onSubmit = () => {
  form.validateFieldsAndScroll((error, values) => {
    // Your logic
  });
};
```

改成：

```jsx
// antd v4
onFinishFailed = ({ errorFields }) => {
  form.scrollToField(errorFields[0].name);
};
```

#### 初始化调整

此外，我们将 `initialValue` 从字段中移到 Form 中。以避免同名字段设置 `initialValue` 的冲突问题：

```jsx
// antd v3
const Demo = ({ form: { getFieldDecorator } }) => (
  <Form>
    <Form.Item>
      {getFieldDecorator('username', {
        rules: [{ required: true }],
        initialValue: 'Bamboo',
      })(<Input />)}
    </Form.Item>
  </Form>
);

const WrappedDemo = Form.create()(Demo);
```

改成：

```jsx
// antd v4
const Demo = () => (
  <Form initialValues={{ username: 'Bamboo' }}>
    <Form.Item name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </Form>
);
```

在 v3 版本中，修改未操作的字段 `initialValue` 会同步更新字段值，这是一个 BUG。但是由于被长期作为一个 feature 使用，因而我们一直没有修复。在 v4 中，该 BUG 已被修复。`initialValue` 只有在初始化以及重置表单时生效。

#### 嵌套字段路径使用数组

过去版本我们通过 `.` 代表嵌套路径（诸如 `user.name` 来代表 `{ user: { name: '' } }`）。然而在一些后台系统中，变量名中也会带上 `.`。这造成用户需要额外的代码进行转化，因而新版中，嵌套路径通过数组来表示以避免错误的处理行为（如 `['user', 'name']`）。

也因此，诸如 `getFieldsError` 等方法返回的路径总是数组形式以便于用户处理：

```jsx
form.getFieldsError();

/*
[
  { name: ['user', 'name'], errors: [] },
  { name: ['user', 'age'], errors: ['Some error message'] },
]
*/
```

嵌套字段定义由：

```jsx
// antd v3
<Form.Item label="Firstname">{getFieldDecorator('user.0.firstname', {})(<Input />)}</Form.Item>
```

改至：

```jsx
// antd v4
<Form.Item name={['user', 0, 'firstname']} label="Firstname">
  <Input />
</Form.Item>
```

相似的，`setFieldsValue` 由：

```jsx
// antd v3
this.formRef.current.setFieldsValue({
  'user.0.firstname': 'John',
});
```

改至：

```jsx
// antd v4
this.formRef.current.setFieldsValue({
  user: [
    {
      firstname: 'John',
    },
  ],
});
```

#### validateFields 不再支持 callback

`validateFields` 会返回 Promise 对象，因而你可以通过 `async/await` 或者 `then/catch` 来执行对应的错误处理。不再需要判断 `errors` 是否为空：

```jsx
// antd v3
validateFields((err, value) => {
  if (!err) {
    // Do something with value
  }
});
```

改成：

```jsx
// antd v4
validateFields().then(values => {
  // Do something with value
});
```

### 数据可视化

* echarts echarts-for-react
* bizcharts

## 功能实现

### 登录数据持久化

默认使用最高级管理员登录，该管理员名称和密码为默认值，且拥有最高权限。通过向后端发送用户名和密码，后端返回用户信息，其中密码在后端使用**md5**加密格式返回，然后将用户信息保存在内存和localStorage中（store.js），每次打开该网站时就从localStorage中读取数据到内存，实现登录数据持久化。

### 跨域和Ajax

### 父子通信

#### props

* 【父组件】给【子组件】传递数据：通过`props`传递

* 【子组件】给【父组件】传递数据：通过`props`传递，**要求父提前给子传递一个函数**

  该项目中将`useState`的更新函数传给子组件，将数据作为函数参数传回父组件用来更新状态

* 【子组件】给【父组件】传递函数/方法

  * `useRef`: 用于获取元素的原生DOM或者获取自定义组件所暴露出来的ref方法(父组件可以通过ref获取子组件，并调用相对应子组件中的方法)
  * `useImperativeHandle`:在函数式组件中，用于定义暴露给父组件的ref方法。
  * `React.forwardRef`: 将ref父类的ref作为参数传入函数式组件中，本身props只带有children这个参数，这样可以让子类转发父类的ref,当父类把ref挂在到子组件上时，子组件外部通过forwrardRef包裹，可以直接将父组件创建的ref挂在到子组件的某个dom元素上。

## 发布

> 由于最开时搭建项目没有考虑发布问题，而且v6版本的'/'代变绝对路径，输入https://Lesliewaong.github.io/react-admin-client会自动跳转至https://Lesliewaong.github.io/，于是使用HashRouter来代替BrowserRouter进行发布。

### BrowserRouter

> 这一种很自然，比如 `/` 对应 `Home页` ，`/about` 对应 `About 页`，但是`这样的设计需要服务器端渲染`，因为`用户可能直接访问任何一个 URL，服务器端必须能对 /的访问返回 HTML，也要对 /about的访问返回 HTML`。BrowserRouter支持这种URL。

①基于`history`模式：页面跳转原理是使用了HTML5为浏览器全局的history对象新增了两个API，包括 history.pushState、history.replaceState；和vue router的history模式实现一致
②更加优雅： 直接拼接路径；如：`www.abc.com/xx`
③**后端需做请求处理**： 切换路由后，请求接口路径会发生变化，后端需要配合，做处理

### HashRouter

> 这一种看起来不自然，但是实现更简单。
>
> `只有一个路径 /，通过 URL 后面的 # 部分来决定路由`，`/#/` 对应 Home 页，`/#/about` 对应 About 页。
>
> 因为URL中`#`之后的部分是不会发送给服务器的，所以，`无论哪个 URL，最后都是访问服务器的 / 路径，服务器也只需要返回同样一份 HTML`就可以，`然后由浏览器端解析#后的部分，完成浏览器端渲染`。HashRouter支持这种URL。

①**基于hash模式**：页面跳转原理是使用了location.hash、location.replace；和vue router的hash模式实现一致。
②**比较丑**：在域名后，先拼接`/#`，再拼接路径；也就是利用锚点，实现路由的跳转；如：`www.abc.com/#/xx`

### 使用场景

**HashRouter**：**项目部署在内网**：如To B的项目、本公司业务人员用的项目等等。

**BrowserRouter**：**项目部署在公网**：如To C的项目、面向大众的项目，url路径美观点当然更好，但后端需要做处理。

### GitHub Pages发布静态页面

* 利用脚手架创建react 项目

```bash
create-react-app react-admin-client
```

* 我们在github上面新建一个远程仓库，名字也叫react-admin-client。记录远程仓库的地址。

* 修改并完善项目，达到你想要的那种程度，疯狂敲代码

* 在package.json配置文件中加一句：

```bash
“homepage”: “https://Lesliewaong.github.io/react-admin-client” 

'react-admin-client '是 项目名称，跟远程仓库名字一样，'Lesliewaong'对应你的github用户名
homepage不配置的话或者配置有误，访问链接的时候就会报错404
```

* 开始打包

```bash
npm run build
// 打包完成之后会生成一个build文件夹，内面都是静态资源
```

* 之后我们就把项目传到github上面去

```bash
git add .
git commit -m '一些描述'
git remote add origin https://github.com/xxx(之前我们保存的地址)
// 一般提交代码之前我们都应该先拉下代码，避免冲突
git pull origin master
git push origin master
// 成功之后代码就会提交到master上面去，此时仓库中有相应的代码
```

* 在github展示的是静态的html文件，我们上传的react项目是不能预览的，此时我们可以把打包好的build文件夹上传到另一个分支

```bash
git subtree push --prefix=build origin gh-pages
```

* 执行上述操作之后，仓库多了个gh-pages分支

* 进入仓库，点击Setting,找到GitHub Pages这一块，修改Source选择刚刚的gh-pages，然后保存

`https://Lesliewaong.github.io/react-admin-client`就是你项目预览的地址。点击链接就可以预览你的项目啦。

## 项目优化

### 自定义hook实现搜索防抖

**Input** `event.target.value` 获取输入值 

**useState** 更新此时的搜索状态 

自定义 hook **useDebounce** 

使用useEffect时，如果直接将debounce放入包裹防抖函数，由于useEffect的特性导致每次都创建了新的定时器，定时器无法按规定清除，于是借助useEffect自定义useDebounce ，将定时器放入useEffect中，并在return中将定时器清除，React 会在组件卸载的时候执行清除操作。effect 在每次渲染的时候都会执行。React 会在执行当前 effect 之前对上一个effect进行清除。

```jsx
import { useEffect } from 'react'
function useDebounce(fn, delay, dep=[]) {
   useEffect(()=>{
      let timer; 
      timer = setTimeout(fn, delay); 
      return ()=>{clearTimeout(timer);} // 这里用到useEffect清除的能力 类似于componentWillUnmount
    // eslint-disable-next-line
    }, [...dep]
  )
}
export default useDebounce
```

后续可能的改进：

在 effect 内部去声明它所需要的函数，能容易的看出那个 effect 依赖了组件作用域中的哪些值，更安全。

其他发现：

依赖的值可以设置多个，只要有一个更新，就会执行effect。

useEffect(() => updateStatus(productStatus), [productStatus,productId])



