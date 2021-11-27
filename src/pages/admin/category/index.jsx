import React, { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import { reqCateGories, reqUpdateCateGories,reqAddCateGory } from '../../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

/**
 * 商品分类路由
 */
export default function Category() {
    const [categories, setCategories] = useState([]);// 一级分类列表
    const [subCategories, setSubCategories] = useState([]);// 二级分类列表
    const [loading, setLoading] = useState(false);//是否正在获取数据中
    const [parentId, setParentId] = useState('0');//当前需要显示的分类列表的父分类ID
    // const [parentName, setParentName] = useState('');//当前需要显示的分类列表的父分类名称
    // 确认框 0：都不显示 1 显示添加 2 显示更新
    const [showStatus, setShowStatus] = useState('0');
    const [title, setTitle] = useState('一级分类列表');   // 左上角标题
    const [categoryData, setCategoryData] = useState({}) //当前行的值
    const [formData, setFormData] = useState({})//获得子组件传回的表单实体
    // 显示添加的确认框
    const showAdd = () => {
        setShowStatus(1)
    }
    // 显示更新的确认框
    const showUpadate = (category) => {
        setCategoryData(category)
        setShowStatus(2)
    }
    // 响应点击取消
    const handleCancel = () => {
        setShowStatus(0)
    }
    // 添加分类
    const addCategory = async () => {
        setShowStatus(0)
        const {categoryParentId,categoryName} = formData.getFieldValue()
        const result = await reqAddCateGory(categoryName, categoryParentId)
        // 添加的父ID和当前父ID相同时，重新获取当前分类列表显示
        if (result.status === 0 && parentId === categoryParentId) {
            getCategories(parentId)
        }

    }
    // 更新分类
    const updateCategory = async () => {
        setShowStatus(0)
        const categoryId = categoryData._id
        const categoryName = formData.getFieldValue('categoryName')
        const result = await reqUpdateCateGories({ categoryName, categoryId })
        if (result.status === 0) {
            // 重新获取当前分类列表显示
            getCategories(parentId)
        }
    }
    const extra = (
        <Button type='primary' onClick={showAdd}>
            <PlusOutlined />
            添加
        </Button>
    )

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',//显示数据对应属性名
        },
        {
            title: '操作',
            width: 300,
            // 参数分别为当前行的值
            render: category => (//返回需要显示的界面标签
                <span>
                    {/* {console.log(category)} */}
                    <LinkButton onClick={() => showUpadate(category)}>修改分类</LinkButton>
                    {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
                    {parentId === '0'
                        ? <LinkButton onClick={() => showSubCategories(category)}>
                            查看子分类
                        </LinkButton>
                        : null}

                </span>
            ),
        }
    ];

    // 异步获取一级/二级分类列表
    const getCategories = async (parentId) => {
        setLoading(true);
        const result = await reqCateGories(parentId);
        setLoading(false);
        if (result.status === 0) {
            if (parentId === '0') {
                setCategories(result.data)
            } else {
                setSubCategories(result.data)
            }

        } else {
            message.error('获取分类列表失败')
        }
    }
    //返回一级分类对列表
    const showFirstCategories = () => {
        setParentId('0')
        setSubCategories([])
        // setParentName('')
        setTitle('一级分类列表')
    }
    //显示指定一级分类对象的二级列表
    const showSubCategories = (category) => {
        setParentId(category._id)
        // setParentName(category.name)
        setTitle(
            <span>
                {console.log(category.name)}
                <LinkButton onClick={showFirstCategories}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: 5 }} />
                <span>{category.name}</span>
            </span>
        )
    }
    // 父子分类切换时，重新获取当前分类列表显示
    // eslint-disable-next-line  
    useEffect(() => { getCategories(parentId) }, [parentId])

    return (
        <Card title={title} extra={extra} >
            <Table
                rowKey='_id'
                bordered
                pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                loading={loading}
                dataSource={parentId === '0' ? categories : subCategories}
                columns={columns} />
            <Modal
                title="添加分类"
                visible={showStatus === 1}
                onOk={addCategory}
                onCancel={handleCancel}>
                <AddForm
                    categories={categories}
                    parentId={parentId}
                    setForm={(form) => setFormData(form)}
                />
            </Modal>
            <Modal
                title="更新分类"
                visible={showStatus === 2}
                onOk={updateCategory}
                onCancel={handleCancel}>
                <UpdateForm
                    categoryData={categoryData}
                    setForm={(form) => setFormData(form)}
                />
            </Modal>
        </Card>
    )
}
