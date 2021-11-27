# react实战全栈后台

## 准备

### 项目描述

1) 此项目为一个**前后台分离**的**后台管理的 SPA**（单页面应用）, 包括前端 PC 应用和后端应用
2) 包括**用户管理** / **商品分类管理** / **商品管理** / **权限管理**等功能模块
3) 前端: 使用 **React 全家桶** + **Antd** + **Axios** + **ES6** + **Webpack** 等技术
4) 后端: 使用 **Node** + **Express** + **Mongodb** 等技术
5) 采用**模块化**、**组件化**、**工程化**的模式开发

B站教程地址:(前100集)https://www.bilibili.com/video/BV1i4411N7Qc?p=100&t=0
(后40集)https://www.bilibili.com/video/BV1tK4y1H76t?p=15

### 技术选型

[![I0hVTe.jpg](https://z3.ax1x.com/2021/11/11/I0hVTe.jpg)](https://imgtu.com/i/I0hVTe)

### 前端路由

[![I0hQ6P.jpg](https://z3.ax1x.com/2021/11/11/I0hQ6P.jpg)](https://imgtu.com/i/I0hQ6P)

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
git commit –m "message" //提交到本地仓库
git remote add origin url //关联到远程仓库
git push origin master //推送本地master 分支到远程master 分支
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
    >pages -------- 路由组件
    >utils -------- 工具模块
	App.js --------- App组件
	index.js ------- 入口文件
```

### 引入antd

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

#### 某个组件中使用 antd 组件

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

* Promise==>异步

* await==>异步转同步
  * await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。
  * await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行
* async==>同步转异步
  * 方法体内部的某个表达式使用await修饰，那么这个方法体所属方法必须要用async修饰所以使用awit方法会自动升级为异步方法

#### 配置代理

package.json

```json
"proxy": "http://localhost:5000"
```

#### 请求测试: login.jsx

### Login 组件(完成登陆功能)

> 维持登陆与自动登陆

`yarn add store`

store.js 是一个兼容所有浏览器的 LocalStorage 包装器，不需要借助 Cookie 或者 Flash。store.js 会根据浏览器自动选择使用 localStorage、globalStorage 或者 userData 来实现本地存储功能。

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

### 父子通信

## 路由路径问题

严格匹配 模糊匹配

### 后端数据

#### MongoDB 的安装与配置

下载：https://www.mongodb.com/try/download/ops-manager

配置path: 将mongodb下的bin目录配置到path环境变量中

#### 添加数据

使用**mongoDB Compass**

连接服务器：`mongodb://localhost/server_db2`

可以手动输入，也可以导入json

### 天气API

#### jsonp解决ajax跨域的原理（教程方案）

`yarn add jsonp`

* jsonp只能解决GET类型的请求跨域问题

* jsonp请求不是ajax请求, 而是一般的get请求

* 基本原理

  * 浏览器端:
    * 动态生成<`script>`来请求后台接口(src就是接口的url)
    * 定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)

  * 服务器端:接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
  *  浏览器端:收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

```jsx
import jsonp from 'jsonp'
import {message} from 'antd'
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
```

#### 和风天气（不需要跨域处理）

[开发文档](https://dev.qweather.com/)

将和风天气图标安装在你的项目中，包括SVG图标、图标字体等等。

```bash
npm i qweather-icons
```

在public下的HTML引入`<link rel="stylesheet" href="%PUBLIC_URL%/css/qweather-icons.css">`，注意还要导入一个font文件，在对应位置即可使用图标字体显示天气图标。picUrl即请求到的图标的代码。

```jsx
<i className={"qi-"+picUrl+"-fill"} style={{color:'black',fontSize:'17px',margin:'0 15px'}}/>
```

### 样式

h1会自动加一个0.5em的margin-bottom

### 类式组件与函数式组件

> 因为React-Router v6正式版的更新，类式路由组件中无法直接操作history，此项目使用函数式组件

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

[官方文档](https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md)

#### 基础使用

该`history`库是 v6 的直接依赖项（不是 peer dep），因此您永远不会直接导入或使用它。相反，您将使用`useNavigate()`钩子进行所有导航。

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

`Router` 是别名，使编写起来更容易。建议在React应用的组件层次结构中的顶级组件上导入和使用它。

`Routes`是以前 `Switch` 组件的升级版，它包括相对路由和链接、自动路由排名、嵌套路由和布局等功能。

所需的 `react-router-dom` 中的最后一个组件称为 `Route`，它负责渲染React组件的UI。它有一个称为 `path` 的属性，该属性始终与应用程序的当前URL匹配。 第二个需要的属性叫做 `element`，当遇到当前的URL时，会告诉 `Route` 组件要渲染哪个React组件。这里的 `element` 键字也是新增加的，此前，在React Router v5中，你会使用名为 `component` 的属性。

#### 编程式跳转

使用`useNavigate`钩子函数生成navigate对象，可以通过JS代码完成路由跳转

> useNavigate取代了原先版本中的useHistory

```js
import { useNavigate } from 'react-router-dom';

function Foo(){
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/foo')}>跳转</div>
    )
}
```

#### 路径参数

- 在`Route组件`中的`path属性`中定义路径参数
- 在组件内通过`useParams` hook访问路径参数

```js
<BrowserRouter>
    <Routes>
        <Route path='/foo/:id' element={Foo} />
    </Routes>
</BrowserRouter>

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

在以前版本中，组件的`props`会包含一个`match对象`，在其中可以取到路径参数。但在最新的6.x版本中，无法从props获取参数。并且，针对类组件的`withRouter`高阶组件已被移除。

#### 重定向

当在某个路径`/a`下，要重定向到路径`/b`时，可以通过`Navigate`组件进行重定向到其他路径

> 等价于以前版本中的`Redirect`组件

```js
import { Navigate } from 'react-router-dom';
function A(){
    return (
        <Navigate to="/b" />
    )
}
```



具有后代路由（在其他组件中定义）的路由其路径中使用`*`在尾随来表示它们深度匹配

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
```

注意`<Route>`元素如何自然嵌套在`<Routes>`元素内。嵌套路由通过添加到父路由的路径来构建它们的路径。这次我们不需要尾随`*`，`<Route path="users">`因为当路由在一个地方定义时，路由器能够看到所有嵌套的路由。

只有`*`当`<Routes>`该路线的后代树中的某处有另一个时，您才需要尾随。在这种情况下，后代`<Routes>`将匹配路径名中剩余的部分。

使用嵌套配置时，路由`children`应呈现`<Outlet>`以呈现其子路由。这使得使用嵌套 UI 渲染布局变得容易。

```jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'

import Category from './pages/admin/category'
import Home from './pages/admin/home'
import Product from './pages/admin/product'
import Role from './pages/admin/role'
import User from './pages/admin/user'
import Bar from './pages/admin/charts/bar'
import Line from './pages/admin/charts/line'
import Pie from './pages/admin/charts/pie'
/**
 *  根组件(函数式)
 */
export default function App() {
    
    return (
        <Router>
            {/* React-Router v6新特性 <Switch>重命名为<Routes></Routes> 
                   component重命名为element 
                */}
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/*' element={<Admin/>}></Route>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/category' element={<Category/>} />
                    <Route path='/product' element={<Product/>} />
                    <Route path='/user' element={<User/>} />
                    <Route path='/role' element={<Role/>} />
                    <Route path="/charts/bar" element={<Bar/>} />
                    <Route path="/charts/pie" element={<Pie/>} />
                    <Route path="/charts/line" element={<Line/>} />
            </Routes>
        </Router>
    )
}

import { Outlet } from 'react-router-dom'
function Admin() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}
```



### Antdv3升级成v4

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

Form 自带表单控制实体，如需要调用 form 方法，可以通过 `Form.useForm()` 创建 Form 实体进行操作：

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

新版 Form 采用增量更新方式，仅会更新需要更新的字段。因而如果有字段关联更新，或者跟随整个表单更新而更新。可以使用 [`dependencies`](https://ant.design/components/form-cn/#dependencies) 或 [`shouldUpdate`](https://ant.design/components/form-cn/#shouldUpdate)。

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

## 学习总结

### 为什么学习使用React
在传统的页面开发模式中，需要多次的操作DOM来进行页面的更新，我们都知道对DOM的操作会造成极大的性能问题。而React的提出就是减少对DOM的操作来提升性能，也就是Virtual DOM。

### Antdv3升级成v4

### 使用echarts绘图

### 新的箭头函数用法
为什么箭头函数返回值要用小括号包括起来？
因为 大括号 是 函数主体 的标志。而箭头函数若要返回 自定义对象 的话，就必须用 小括号 把该对象括起来先。

### 主组件的文件名都是index.jsx

跟教程的按组件命名还是有些差别

### 添加了postman的接口json

翻了翻评论区,都没人提供.就自己手打搞了一个

### 服务器地址用的评论区的

地址为：http://120.55.193.14:5000
天气接口换成了高德api，教程百度的挂了

### 其他总结
1.实现页面跳转前return，防止内存泄漏
2.initialvalue写在item上
3.因为后台数据保存不规范，要检查item是否存在再渲染


## Redux总结
redux确实学的有点头疼.关键得理解他到底每一步存在的意义是啥.不然连这部操作的必要性都不知道,自然就记不清有多少步了.
### 什么情况下需要使用 redux
1) 总体原则: 能不用就不用, 如果不用比较吃力才考虑使用
2) 某个组件的状态，需要共享
3) 某个状态需要在任何地方都可以拿到
4) 一个组件需要改变全局状态
5) 一个组件需要改变另一个组件的状态
### 分清react-redux和redux
1) 一开始完全懵逼,store.dispatch和connect this.props 混用,傻傻分不清,学了源码才知道connect Provider是react-redux的东西
2) 使用react-redux,你不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性
3) react 16.0后与教程源码有所出入,于是学的最新的
### reducer为纯函数
简单来说，一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数
