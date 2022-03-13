import React, { useState, useEffect } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdatesProductsStatus } from '../../../../api/index'
import { PAGE_SIZE } from '../../../../utils/constants'
import useDebounce from '../../../../hooks/useDebounce';

const { Option } = Select;
/**
 * Product的默认子路由组件
 */
export default function ProductHome() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);// 商品数组
    const [total, setTotal] = useState(0);// 商品总数量
    const [loading, setLoading] = useState(false);//是否正在获取数据中
    const [pageNum, setPageNum] = useState(1);// 商品数组当前页码数
    const [searchName, setSearchName] = useState(undefined);// 搜索内容
    const [searchType, setSearchType] = useState('productName');// 搜索类型
    const [productId, setProductId] = useState('');// 商品id
    const [productStatus, setProductStatus] = useState(0);// 商品状态
    const title = (
        <span>
            <Select
                value={searchType}
                style={{ width: 150 }}
                onChange={setSearchType} //value => setsearchType(value)
            >
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
                placeholder='关键字'
                style={{ width: 150, margin: '0 15px' }}
                value={searchName}
                // 根据文档判断onChange的传值到底是什么
                onChange={event => { 
                    // setPageNum(1); 
                    setSearchName(event.target.value); 
                    // console.log(event.target.value); 
                }}
            />
            <Button type='primary' onClick={() => { setPageNum(1);}}>搜索</Button>
        </span>
    )
    const extra = (
        <Button type='primary' onClick={() => navigate('addupdate')}>
            <PlusOutlined />
            添加商品
        </Button>
    )
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
        },
        {
            width: 100,
            title: '状态',
            // dataIndex: 'status',
            render: (product) => {
                const { status, _id } = product
                return (
                    <span>
                        <Button
                            type='primary'
                            onClick={() =>{setProductId(_id);(status === 1 ?setProductStatus(2):setProductStatus(1))}}
                            // onClick={() => updateStatus(_id, status === 1 ? 2 : 1)}
                        >
                            {status === 1 ? '下架' : '上架'}
                        </Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
        },
        {
            width: 100,
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        {/*将product对象使用state传递给目标路由组件*/}
                        <LinkButton onClick={() => navigate('detail', { state: product })} >
                            {/* <Link to='detail'>详情</Link> */}
                            详情
                        </LinkButton>
                        <LinkButton onClick={() => navigate('addupdate', { state: product })} >
                            修改
                        </LinkButton>
                    </span>
                )
            }
        },
    ]
    // 获取指定页码的列表数据显示
    const getProducts = async (pageNum) => {
        console.log(1)
        setLoading(true)
        // console.log(searchName)
        //是否有搜索内容
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else  {//一般分页
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        // console.log(result)
        setLoading(false)
        if (result.status === 0) {
            const { total, list } = result.data
            setProducts(list)
            setTotal(total)
        }

    }
    // 获取指定搜索内容的列表数据显示
    const getProductsbySearch = async (searchName) => { 
        // console.log(searchName)
        //是否搜索
        if (searchName || searchName === '') {
            console.log(1)
            setLoading(true)
            let result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
            setLoading(false)
            if (result.status === 0) {
                const { total, list } = result.data
                setProducts(list)
                setTotal(total)
                setPageNum(1)
            }
        } 
        // console.log(result)
    }
    //   更新指定商品的状态
    const updateStatus = async (status) => {
        const result = await reqUpdatesProductsStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品成功')
            getProducts(pageNum);
        }
    }
    // eslint-disable-next-line  
    useEffect(() => getProducts(pageNum), [pageNum])
    // eslint-disable-next-line
    useEffect(() => updateStatus(productStatus), [productStatus,productId])
    useDebounce(() => getProductsbySearch(searchName), 1000, [searchName])
    return (
        <Card title={title} extra={extra}>
            <Table
                bordered
                rowKey='_id'
                dataSource={products}
                columns={columns}
                loading={loading}
                pagination={{
                    current: pageNum,
                    total,//total:total, 
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange: setPageNum //(pageNum) => setPageNum(pageNum)
                }}
            />
        </Card>
    )
}
