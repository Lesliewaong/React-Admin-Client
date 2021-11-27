import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

/**
 * 添加分类的form组件
 */
export default function AddForm(props) {
    const { setForm } = props
    const [form] = Form.useForm();
    useEffect(() => {
        setForm(form)
        // eslint-disable-next-line
    }, []);
    return (
        <Form form={form}>

            <Form.Item
                label='角色名称'
                name='roleName'
                rules={[{ required: true, message: "角色名称必须输入" }]}
            >
                <Input placeholder='请输入角色名称' />
            </Form.Item>
        </Form>
    )
}
AddForm.propTypes = {
    setForm: PropTypes.func.isRequired,

}