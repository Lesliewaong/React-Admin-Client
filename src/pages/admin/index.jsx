import React from 'react'
import { Layout } from 'antd';
import { Outlet,Navigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

const { Footer, Sider, Content } = Layout;
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
        //antd的Layout布局
        <Layout style={{ minHeight: '100%' }}>
            <Sider>
                <LeftNav />
            </Sider>
            <Layout>
                <Header />           
                <Content style={{ margin:20,backgroundColor: '#fff' }}>         
                   <Outlet />{/* 占位符 */}
                </Content>
                <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    )

}
