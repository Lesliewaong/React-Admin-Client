import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Modal ,message} from 'antd'
import { formateDate } from '../../../utils/dateUtils'
import LinkButton from '../../../components/link-button'
import { reqUsers, reqAddOrUpdateUser,reqDeleteUser } from '../../../api/index'
import UserForm from './user-form'
import {PAGE_SIZE} from '../../../utils/constants'
/**
 * 用户路由
 */
export default function User() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [roles, setRoles] = useState([])
    const [roleNames, setRoleNames] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [formData, setFormData] = useState({})
    

    const title = (<Button type='primary' onClick={()=>showAdd()}>创建用户</Button>)
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },

        {
            title: '电话',
            dataIndex: 'phone'
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: formateDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => roleNames[role_id]
        },
        {
            title: '操作',
            render: (user) => ( 
                <span>
                    <LinkButton onClick={() => showUpdate(user)}>修改</LinkButton>
                    <LinkButton onClick={() => deleteUser(user)}>删除</LinkButton>
                </span>
            )
        },
    ]
    //   显示添加界面
    const showAdd = () => {
        setUser({}) // 去除前面保存的user
        setIsShow(true)
    }

    //   显示修改界面
    const showUpdate = (user) => {
        setUser(user)// 保存user
        setIsShow(true)
    }
  
    // 删除指定用户
    const deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success('删除用户成功!')
                    getUsers()
                }
            }
        })
    }

    //   添加/更新用户
    const addOrUpdateUser = async () => {
        setIsShow(false)
        // 1. 收集输入数据
        const user1 = formData.getFieldsValue()
        formData.resetFields()
        // 如果是更新, 需要给user指定_id属性
        if (user1) {
          user1._id = user._id
        }
        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(user1)
        // 3. 更新列表显示
        if (result.status === 0) {
            message.success(`${user1 ? '修改' : '添加'}用户成功`)
            getUsers()
        }
    }
    //   根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
    const initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        // 保存
        setRoleNames(roleNames)
    }
    // 获取用户信息
    const getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
            initRoleNames(roles)
            setUsers(users)
            setRoles(roles)
        }
    }
    // eslint-disable-next-line  
    useEffect(() => { getUsers() }, [])
    return (
        <Card title={title}>
            <Table
                bordered
                rowKey='_id'
                dataSource={users}
                columns={columns}
                pagination={{ defaultPageSize: PAGE_SIZE }}
            />
            <Modal
                title={user._id ? '修改用户' : '添加用户'}
                visible={isShow}
                onOk={addOrUpdateUser}
                onCancel={() => {
                    formData.resetFields()
                    setIsShow(false)
                }}
            >
                <UserForm
                    setForm={form => setFormData(form)}
                    roles={roles}
                    user={user}
                />
            </Modal>
        </Card>
    )
}
