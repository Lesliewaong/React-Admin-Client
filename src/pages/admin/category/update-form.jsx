import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

/**
 * 更新分类的form组件
 */
export default function UpdateForm(props) {
    // 连续解构赋值加重命名
    const { categoryData:{name:categoryName}, setForm } = props
    // 创建 Form 实体
    const [form] = Form.useForm();
    //{ categoryName:categoryName}=>{ categoryName} 
    // 第一个是Form.Item的name，第二个是父组件传来的categoryName
    useEffect(() => {
        form.setFieldsValue({ categoryName });
        setForm(form)
    // eslint-disable-next-line
    }, [categoryName]);
    console.log(setForm)
    console.log(typeof(categoryName))
    return (
        <Form form={form}>
            <Form.Item name='categoryName' rules={[{ required: true, message: "分类名称必须输入" }]}>
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>
    )
}
//对接收的props进行：类型、必要性的限制
UpdateForm.propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryData:PropTypes.object.isRequired

}
