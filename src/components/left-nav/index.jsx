import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import logo from '../../assets/images/logo.jpg'
import './index.less'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

const { SubMenu } = Menu;
/**
 * 左侧导航的组件
 */

export default function LeftNav() {
  // v5:withRouter高阶组件:包装非路由组件, 返回一个新的组件
  // 新的组件向非路由组件传递3个属性: history/location/match
  // v6:使用useLocation即可得到location属性，withRouter不再使用
  let path = useLocation().pathname; 
  path = '/' + path.split(/\//)[1]// 当前请求的含有子路由界面时过滤子路由地址
  // console.log(path)
  let openKey = '';
  //  根据menu的数据数组生成对应的标签数组 
  // map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  // reduce()也可以实现。
  const getMenuNodes = menuList => {
    return menuList.map(item => {
      if (hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          )
        } else {
          // 查找一个与当前请求路径匹配的子Item
          // find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
          // const cItem = item.children.find(cItem => cItem.key === path1)
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            openKey = item.key     
          }
          
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {getMenuNodes(item.children)}
            </SubMenu>
          )
        }
      }else{
        return null
      } 
    })
  }

  // 判断当前登陆用户对item是否有权限
  const hasAuth = (item) => {
    const { key } = item
    console.log(memoryUtils.user)
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 当前用户有此item的权限: key有没有在menus中
     */
    if (username === 'admin' || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }

    return false
  }
  //出现这个warning的原因是钩子里调用的函数是在外部声明的。
  // 刷新时调用一次，得到初始openKey
  useMemo(() => {
    getMenuNodes(menuList)
    // eslint-disable-next-line
  }, [])

  // getMenuNodes(menuList)
  return (
    <div className="left-nav">

      <Link to='/' className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>商城后台</h1>
      </Link>
      <Menu
        //初始选中的菜单项 key 数组
        // defaultSelectedKeys={[path]}
        //当前选中的菜单项 key 数组
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}

        mode="inline"
        theme="dark"
      >

        {/* {{}}代表对象,{}代表表达式 */}
        {getMenuNodes(menuList)}
      </Menu>
    </div>
  )
}
