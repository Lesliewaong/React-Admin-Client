import React,{useState,useEffect} from 'react'
import { Card, List} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate,useLocation } from "react-router-dom"
import LinkButton from '../../../../components/link-button'
import { BASE_IMG_URL } from '../../../../utils/constants'
import {reqCategory} from '../../../../api/index'
const { Item } = List
/**
 * Product的详情子路由组件
 */
export default function ProductDetail() {
    const [cName1,setCName1] = useState('')//一级分类名称
    const [cName2,setCName2] = useState('')//二级分类名称

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    // 得到当前商品的信息 通过state传递
    const {name, desc, price, detail, imgs,pCategoryId, categoryId} = location.state
    const title = (
        <span>
            <LinkButton>
                 <ArrowLeftOutlined 
                 style={{marginRight:10,fontSize:20}}
                 onClick={() => navigate(-1)}
                 />       
            </LinkButton>

            <span>商品详情</span>
        </span>
    )
    // 得到当前商品的分类
    const getCategory = async () => {
        if(pCategoryId==='0') { // 一级分类下的商品
            const result = await reqCategory(categoryId)
            const cN1 = result.data.name
            setCName1(cN1)
          } else { // 二级分类下的商品
            /*
            //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
            const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
            const result2 = await reqCategory(categoryId) // 获取二级分类
            const cName1 = result1.data.name
            const cName2 = result2.data.name
            */
      
            // 一次性发送多个请求, 只有都成功了, 才正常处理
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const {name:cN1} = results[0].data
            const {name:cN2} = results[1].data
            setCName1(cN1)
            setCName2(cN2)

          }
    }
    // eslint-disable-next-line  
    useEffect(() => { getCategory() }, [])
    return (
        <Card title={title} className='product-detail'>
            {/* 设置 List.Item 布局, 设置成 vertical 则竖直样式显示, 默认横排 */}
            <List bordered itemLayout ="vertical" >
                <Item>
                    <span className="left">商品名称：</span>
                    <span>{name}</span>
                </Item>
                <Item>
                    <span className="left">商品描述：</span>
                    <span>{desc}</span>
                </Item>
                <Item>
                    <span className="left">商品价格：</span>
                    <span>{price}元</span>
                </Item>
                <Item>
                    <span className="left">所属分类：</span>
                    <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
                </Item>
                <Item>
                    <span className="left">商品图片：</span>
                    <span >
                        {
                            imgs.map(img => (
                                <img
                                  key={img}
                                  src={BASE_IMG_URL + img}
                                  className="product-img"
                                  alt="img"
                                />
                              ))
                        }
                    </span>
                </Item>
                <Item>
                    {/* dangerouslySetInnerHTML是React为浏览器DOM提供innerHTML的替换方案。
                    通常来讲，使用代码直接设置HTML存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击。
                    因此，你可以直接在React中设置HTML，但当你想设置dangerouslySetInnerHTML时，
                    需要向其传递包含key为__html的对象，以此来警示你。 */}
                    <span className="left">商品详情:</span>
                    <span dangerouslySetInnerHTML={{ __html: detail }}>
                    </span>
                </Item>
            </List>

        </Card>
    )
}
