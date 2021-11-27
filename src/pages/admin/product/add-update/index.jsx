import React, { useEffect, useState, useRef } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from "react-router-dom"
import LinkButton from '../../../../components/link-button'
import { reqCateGories,reqAddOrUpdateProduct } from '../../../../api/index'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

const { Item } = Form
const { TextArea } = Input
/*
* Product的添加和更新的子路由组件
*/
export default function ProductAddUpdate() {
    const navigate = useNavigate()
    // 在函数的内部是可以使用useRef钩子来获取组件内的DOM元素。
    const pw = useRef()
    const editor = useRef()

    const [options, setOptions] = useState([]);
 
    const [form] = Form.useForm();
    const location = useLocation();
    const isUpdate = location.state
    const product = isUpdate || {}
    const { pCategoryId, categoryId, imgs, detail,_id } = product
    // 用来接收级联分类ID的数组
    const categoryIds = []
    if (isUpdate) {
        // 商品是一个一级分类的商品
        if (pCategoryId === '0') {
            categoryIds.push(categoryId)
        } else {
            // 商品是一个二级分类的商品
            categoryIds.push(pCategoryId)
            categoryIds.push(categoryId)
        }
    }
    const onFinish = async (values) => {
        // console.log(values)
        // 1. 收集数据, 并封装成product对象
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length===1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = pw.current.getImgs()
        const detail = editor.current.getDetail()
        // console.log(imgs)
        // console.log(detail)

        const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}

        // 如果是更新, 需要添加_id
        if(isUpdate) {
            product._id=_id
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果提示
        if (result.status===0) {
          message.success(`${isUpdate ? '更新' : '添加'}商品成功!`)
          navigate(-1)
        } else {
          message.error(`${isUpdate ? '更新' : '添加'}商品失败!`)
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('校验失败', errorInfo);
    };
    const initOptions = async (categorys) => {
        // 根据categorys生成options数组
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false, // 不是叶子
        }))
        // 如果是一个二级分类商品的更新
        if (isUpdate && pCategoryId !== '0') {
            // 获取对应的二级分类列表
            const subCategorys = await getCategories(pCategoryId)
            // 生成二级下拉列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
            }))
            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId)
            // 关联对应的一级option上
            targetOption.children = childOptions
        }
        // 更新options状态
        setOptions(options)
    }
    // 异步获取一级/二级分类列表
    // async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
    const getCategories = async (parentId) => {
        const result = await reqCateGories(parentId);
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                initOptions(categorys)
            } else {
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }

        } else {
            message.error('获取分类列表失败')
        }
    }

    // 用加载下一级列表的回调函数
    const loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];// 得到选择的option对象
        targetOption.loading = true;// 显示loading
        // 根据选中的分类, 请求获取二级分类列表
        const subCategorys = await getCategories(targetOption.value)
        // 隐藏loading
        targetOption.loading = false
        // 二级分类数组有数据
        if (subCategorys && subCategorys.length > 0) {
            // 生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }

        setOptions([...options]);

    };
    useEffect(() => {
        getCategories('0')
        form.setFieldsValue({
            name: product.name,
            desc: product.desc,
            price: product.price,
            categoryIds
        });
        // eslint-disable-next-line
    }, []);
    const title = (
        <span>
            <LinkButton>
                <ArrowLeftOutlined
                    style={{ marginRight: 10, fontSize: 20 }}
                    onClick={() => navigate(-1)}
                />
            </LinkButton>

            <span>{isUpdate ? '修改商品' : '添加商品'}</span>
        </span>
    )
    return (
        <Card title={title} >
            <Form
                form={form}
                labelCol={{ span: 2 }} //左侧label宽度
                wrapperCol={{ span: 8 }}//右侧包裹宽度
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Item
                    name='name'
                    label="商品名称"
                    rules={[{ required: true, message: '必须输入商品名称' }]}

                >
                    <Input placeholder='请输入商品名称' />
                </Item>
                <Item
                    name='desc'
                    label="商品描述"
                    rules={[{ required: true, message: '必须输入商品描述' }]}
                >
                    <TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />
                </Item>
                <Item
                    name='price'
                    label="商品价格"
                    rules={[
                        { required: true, message: '必须输入商品价格' },
                        {
                            validator: (_, value) => {
                                if (value && value * 1 <= 0) {
                                    return Promise.reject(new Error('价格必须大于0'));
                                } else {
                                    return Promise.resolve();
                                }
                            }
                        }]}
                >
                    <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
                </Item>
                <Item
                    name='categoryIds'
                    label="商品分类"
                    rules={[{ required: true, message: '必须输入商品分类' }]}
                >
                    <Cascader placeholder='请指定商品分类' options={options} loadData={loadData} />
                </Item>

                <Item label="商品图片">
                    <PicturesWall ref={pw} imgs={imgs} />
                </Item>
                <Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
                    <RichTextEditor ref={editor} detail={detail}/>
                </Item>
                <Item>
                    <Button type='primary' htmlType="submit" >提交</Button>
                </Item>
            </Form>


        </Card>
    )
}
