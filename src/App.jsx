import React from 'react'
import { Routes, Route } from 'react-router-dom'
// 引入路由组件
import Login from './pages/login'
import Admin from './pages/admin'
import NotFound from './pages/not-found'
import User from './pages/admin/user'
import Category from './pages/admin/category'
import Home from './pages/admin/home'
import Product from './pages/admin/product'
import Role from './pages/admin/role'
import Bar from './pages/admin/charts/bar'
import Line from './pages/admin/charts/line'
import Pie from './pages/admin/charts/pie'
import ProductHome from './pages/admin/product/home'
import ProductDetail from './pages/admin/product/detail'
import ProductAddUpdate from './pages/admin/product/add-update'
/**
 *  根组件(函数式)
 */
export default function App() {
    return (

        // React-Router v6新特性 <Switch>重命名为<Routes></Routes> 
        // component重命名为element
        // 中小型项目嵌套路由可集中显示，在需要显示的地方使用<Outlet />作为占位符
        // 若分别显示，具有后代路由（在其他组件中定义）的路由在其路径中使用尾随* 
        // index 表示主路由
        // v6中不再支持 v5 中的 <Redirect> 元素作为路由配置的一部分（在 <Routes> 内）
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Admin />}>
                <Route index element={<Home />} />
                <Route path='/category' element={<Category />} />
                <Route path='/product' element={<Product />}>
                    <Route index element={<ProductHome />} />
                    <Route path='detail' element={<ProductDetail />} />
                    <Route path='addupdate' element={<ProductAddUpdate />} />
                </Route>
                <Route path='/user' element={<User />} />
                <Route path='/role' element={<Role />} />
                <Route path="/charts-bar" element={<Bar />} />
                <Route path="/charts-pie" element={<Pie />} />
                <Route path="/charts-line" element={<Line />} />    
            </Route>
            {/* 以上路径都不匹配时 */}
            <Route path='*' element={<NotFound />} />
        </Routes>

    )
}
