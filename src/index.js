// 入口js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'
import 'antd/dist/antd.less'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user
// React解析组件标签，找到了App组件。
// 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
document.getElementById('root'))