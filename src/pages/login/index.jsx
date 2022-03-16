import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { reqLogin } from '../../api'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import hat from '../../assets/images/hat.svg'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
/**
 * 登录的路由组件(函数式组件)
 * 类式路由组件在onFinish中拿不到history
 *  */
export default function Login() {
    const navigate = useNavigate();
    const [isRemember, setIsRemember] = useState(true)
    const [form] = Form.useForm()    //antd的Form组件的方法

    // 提交表单且数据验证成功后回调事件
    const onFinish = async values => {
        const { username, password } = values;
        const result = await reqLogin(username, password);//发送AJAX
        if (result.status === 0) { // 登陆成功
            message.success('登陆成功')
            // 保存user            
            const user = result.data
            console.log(user)
            memoryUtils.user = user // 保存在内存中
            storageUtils.saveUser(user) // 保存到local中
            // 跳转到管理界面 (不需要再回退回到登陆)
            navigate('/', { replace: true })
        } else {
            message.error(result.msg)
        }

    }
    // 提交表单且数据验证失败后回调事件
    const onFinishFailed = (errorInfo) => {
        console.log('校验失败', errorInfo);
    };
    useEffect(() => {
        if (isRemember) {
            form.setFieldsValue({ username: 'admin', password: 'admin' })
        } else {
            form.resetFields()
        }
        // eslint-disable-next-line 
    }, [isRemember])
    // 静态页面
    const staticPage = () => {
        const user = {
            "_id": {
                "$oid": "6198ff0202576ee4ac9d6abd"
            },
            "username": "admin",
            "password": "21232f297a57a5a743894a0e4a801fc3",
            "create_time": 1637416706425,
            "__v": 0,
            'role':{
                'menus':[]
            }
        }
        // user.role.menus=[]
        memoryUtils.user = user // 保存在内存中
        storageUtils.saveUser(user) // 保存到local中
        // 跳转到管理界面 (不需要再回退回到登陆)
        navigate('/', { replace: true })
    }
    return (
        <div className="login">
            <header className="login-header">
                <img src={hat} alt="logo" />               
                <h1>One Piece 商城后台管理系统</h1>
            </header>
            <section className="login-content">
                <h2>用户登录</h2>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: isRemember }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        // 校验规则，设置字段的校验逻辑。
                        // whitespace	如果字段仅包含空格则校验不通过，只在type: 'string' 时生效
                        rules={[
                            { required: true, whitespace: true, message: '请输入你的用户名!' },
                            { max: 12, message: '用户名最多十二位' },
                            { min: 3, message: '用户名至少三位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文,数字和下划线组成' },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        // validator 自定义校验，接收 Promise 作为返回值。
                        rules={[{
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject(new Error('密码必须输入'));
                                } else if (value.length < 3 || value.length > 12) {
                                    return Promise.reject(new Error('密码长度不能小于4位或大于12位'));
                                    // ^表示字符串开始，$表示字符串结束 +号表示重复1到多次
                                    // test检查一个字符串是否符合正则表达式的规则
                                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                    return Promise.reject(new Error('密码必须是英文，数字和下划线组成'));
                                } else {
                                    return Promise.resolve();
                                }
                            }
                        }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox
                                onChange={(v) => setIsRemember(v.target.checked)}
                            >
                                管理员登录
                            </Checkbox>
                        </Form.Item>
                        <a className="react-doc" href="https://zh-hans.reactjs.org/">React文档</a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <LinkButton onClick={staticPage}>
                    跳转静态页面(访客登录)
                </LinkButton>
            </section>
        </div>
    )

}