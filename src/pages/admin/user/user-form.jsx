import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const { Item } = Form
const { Option } = Select
/**
 * 添加/修改用户的form组件
 */

export default function UserForm(props) {
  const { roles, user, setForm } = props
  const { username, _id, password, phone, email, role_id } = user
  console.log(user)
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ username, password, phone, email, role_id });
    setForm(form)
    // eslint-disable-next-line
  }, [user]);
  return (
    <Form
      form={form}
      labelCol={{ span: 4 }} //左侧label宽度
      wrapperCol={{ span: 15 }}//右侧包裹宽度
    >
      <Item label='用户名' name='username'>
        <Input placeholder='请输入用户名' />
      </Item>
      {
        _id ? null : (
          <Item label='密码' name='password'>
            <Input type='password' placeholder='请输入密码' />
          </Item>
        )
      }
      <Item label='手机号' name='phone'>
        <Input placeholder='请输入手机号' />
      </Item>
      <Item label='邮箱' name='email'>
        <Input placeholder='请输入邮箱' />
      </Item>
      <Item label='角色' name='role_id'>
        <Select>
          {
            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
          }
        </Select>
      </Item>
    </Form>
  )
}
UserForm.propTypes = {
  setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
  roles: PropTypes.array.isRequired,
  user: PropTypes.object
}