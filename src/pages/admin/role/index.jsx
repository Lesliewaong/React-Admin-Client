import React, { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from '../../../utils/constants'
import { reqRoles, reqAddRole,reqUpdateRole } from '../../../api/index'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../../utils/memoryUtils'
import storageUtils from '../../../utils/storageUtils'
import {formateDate} from '../../../utils/dateUtils'
/**
 * 角色路由 
 * */
export default function Role() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([])// 所有角色的列表
  const [role, setRole] = useState({})// 选中的role
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isShowAdd, setIsShowAdd] = useState(false)// 是否显示添加界面
  const [isShowAuth, setIsShowAuth] = useState(false)// 是否显示设置权限界面
  const [formData, setFormData] = useState({})//获得子组件传回的表单实体
  const [menus,setMenus]=useState([])
  // console.log(menus)
  const title = (
    <span>
      <Button type='primary' onClick={() => setIsShowAdd(true)}>创建角色</Button> &nbsp;&nbsp;
      <Button type='primary' disabled={!role._id} onClick={() => setIsShowAuth(true)}>设置角色权限</Button>
    </span>
  )
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => formateDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formateDate
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    },
  ]
  const onRow = (role) => {
    return {
      onClick: event => { // 点击行
        // console.log('row onClick()', role)
        setRole(role)
        setSelectedRowKeys([role._id])
      },
    }
  }
  // 获取角色
  const getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      setRoles(roles)

    }
  }
  // 添加角色
  const addRole = async () => {
    setIsShowAdd(false)// 执行完函数后关闭添加表单
    // 收集输入数据
    const { roleName } = formData.getFieldValue()
    const result = await reqAddRole(roleName)
    if (result.status === 0) {
      message.success('添加角色成功')
      getRoles()
    } else {
      message.error('添加角色失败')
    }
    formData.resetFields()//清空输入内容

  }
  
  // 更新角色
  const updateRole = async () => {
    setIsShowAuth(false)
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    console.log(role)
    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status===0) {
      // 如果当前更新的是自己角色的权限, 强制退出
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        navigate('/login', { replace: true })
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
        

      }

    }

  }
  // eslint-disable-next-line  
  useEffect(() => { getRoles() }, [])
  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='_id'
        dataSource={roles}
        columns={columns}
        pagination={{ defaultPageSize: PAGE_SIZE }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
          onSelect: (role) => setRole(role) // 选择某个radio时回调
            
        }}
        onRow={onRow}
      />
      <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => {
          setIsShowAdd(false)
          formData.resetFields()//清空输入内容
        }}>
        <AddForm
          setForm={(form) => setFormData(form)}
        />
      </Modal>
      <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => {
          setIsShowAuth(false)
        }}>
        <AuthForm role={role} getMenus={(menus)=>setMenus(menus)}/>
      </Modal>
    </Card>
  )
}
