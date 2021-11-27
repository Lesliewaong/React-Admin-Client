import React,{useEffect} from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const { Option } = Select;
/**
 * 添加分类的form组件
 */
export default function AddForm(props) {
    const { categories, parentId,setForm } = props
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ categoryParentId:parentId });
        setForm(form)
    // eslint-disable-next-line
    }, [parentId]);
    return (
        <Form form={form}>
            <Form.Item name='categoryParentId' >
                <Select>
                    <Option value='0'>一级分类</Option>
                    {
                        categories.map(c =><Option value={c._id} key={c._id}>{c.name}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item 
            name='categoryName'  
            rules={[{ required: true, message: "分类名称必须输入" }]}
            >
                <Input placeholder='请输入分类名称' />
            </Form.Item>
        </Form>
    )
}
AddForm.propTypes = {
    categories:PropTypes.array.isRequired,//一级分类的数组
    parentId:PropTypes.string.isRequired,//父分类的ID
    setForm: PropTypes.func.isRequired,

}