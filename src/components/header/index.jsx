import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { Modal, message  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
const { confirm } = Modal;
/**
 * 头部导航组件
 */
export default function Header() {
    const username  = memoryUtils.user.username;
    const [time,setTime] = useState(formateDate(Date.now()));
    const [picUrl,setPicUrl] = useState('');
    const [weather,setWeather] = useState('');
    const path = useLocation().pathname;
    let navigate = useNavigate();
    let title ='';
    // 请求实时天气
    const getWeather = async ()=>{
        const result =await reqWeather('d6d54c0f8bb54160b97507ce068abda8','101010100');
        if(result.code === "200"){
            const {now:{icon,text}} = result
            // const {icon,text} =now;
            setPicUrl(icon)
            // console.log(icon)
            if(parseInt(icon)===154){
                setPicUrl(104)
            }
            setWeather(text)
        }else {
            message.error('获取天气信息失败')
        }
        

    }
    // 动态显示当前时间和天气
    useEffect(()=>{
        getWeather();

		let timer = setInterval(()=>{
			setTime(formateDate(Date.now()) )
		},1000)
		return ()=>{
			clearInterval(timer)
		}
	},[])
    // 动态显示当前标题
    const getTitle = menuList =>{
        return menuList.map(item => {
            if (!item.children) {
                if (item.key===path){
                    title = item.title
                }               
            } else {
                getTitle(item.children)
            }
            return title
          })
    }
    getTitle(menuList)
    // 退出登录
    const logout= () =>{
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            // content: '真的确定退出吗',
            onOk() {
              // console.log('OK');
              storageUtils.removeUser()
              memoryUtils.user = {}
              navigate('/login', { replace: true })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎，{username}</span>
                <LinkButton onClick={logout}>退出</LinkButton>
                {/* <a href="javascript:" onClick={logout}>退出</a> */}
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{time}</span>
                    {/* 图标字体 */}
                    <i className={"qi-"+picUrl+"-fill"} style={{color:'black',fontSize:'17px',margin:'0 15px'}}/>
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    )
}
