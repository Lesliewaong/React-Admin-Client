import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { reqLogin } from '../../api'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import hat from '../../assets/images/hat.png'
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
            'role': {
                'menus': []
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
                {/* <svg t="1647483513008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2255" width="200" height="200"><path d="M722.4 470.72A194.4 194.4 0 0 1 701.12 560 466.4 466.4 0 0 1 528 588.8 462.56 462.56 0 0 1 353.44 560a194.4 194.4 0 0 1-21.28-88.8v-5.6a195.2 195.2 0 0 1 390.24 0z" fill="#E1BE79" p-id="2256"></path><path d="M142.4 567.52a384.96 138.72 0 1 0 769.92 0 384.96 138.72 0 1 0-769.92 0Z" fill="#E1BE79" p-id="2257"></path><path d="M722.4 469.12v1.6c0 32 0 78.56-34.56 94.88-47.04 22.88-109.44 23.2-160 23.2A519.04 519.04 0 0 1 384 570.4a64 64 0 0 1-43.84-43.68 196.64 196.64 0 0 1-8.16-56v3.84c39.52 23.84 112 34.72 195.2 34.72s155.68-16.16 195.2-40.16z" fill="#CF1000" p-id="2258"></path><path d="M357.12 592.96h-4.32a87.84 87.84 0 0 1-61.28-62.24 212.8 212.8 0 0 1-7.04-54.24v-6.24a210.08 210.08 0 0 1 80-158.72A16 16 0 1 1 384 336a177.76 177.76 0 0 0-67.36 134.88v3.68a182.4 182.4 0 0 0 5.92 48 56.16 56.16 0 0 0 39.2 39.68 16 16 0 0 1 11.04 19.68 16 16 0 0 1-15.68 11.04zM496 610.08a631.04 631.04 0 0 1-72.64-4.16l-10.08-1.28-6.08-0.96-9.92-1.6a16 16 0 1 1 5.28-32l9.28 1.44 5.76 0.8 9.44 1.28a603.04 603.04 0 0 0 68.96 4 563.36 563.36 0 0 0 96-7.84l12.64-2.08a157.6 157.6 0 0 0 51.04-13.6c20.48-11.36 20.32-49.28 20.32-74.4v-9.28a182.72 182.72 0 0 0-8.8-51.04c-1.28-3.52-2.4-7.04-3.84-10.56a16 16 0 0 1 29.6-11.68c1.6 4 3.04 8.16 4.48 12.32a217.6 217.6 0 0 1 10.4 60V480c0 32 0 81.6-36.48 102.08A181.92 181.92 0 0 1 608 599.84l-12.16 1.92a594.56 594.56 0 0 1-99.84 8.32zM656.8 382.08a16 16 0 0 1-13.12-6.88 179.52 179.52 0 0 0-147.68-78.4 173.28 173.28 0 0 0-35.36 3.52 16 16 0 1 1-6.24-31.2 210.72 210.72 0 0 1 216 88.16 16 16 0 0 1-4.16 22.08 16 16 0 0 1-9.44 2.72zM409.12 316.96a16 16 0 0 1-7.2-30.24l10.88-4.96a16 16 0 0 1 20.96 8.48 16 16 0 0 1-8.48 20.8q-4.48 1.92-9.12 4.32a16 16 0 0 1-7.04 1.6z" fill="" p-id="2259"></path><path d="M233.28 690.4a17.92 17.92 0 0 1-4.96 0c-86.24-28.96-133.76-70.4-133.76-116.8 0-57.92 76.32-108.48 203.84-135.36a16 16 0 0 1 6.56 31.2c-108.48 22.72-178.56 64-178.56 104.16 0 30.72 41.92 63.04 112 86.56a16 16 0 0 1-5.12 31.04zM280.8 704h-6.4a16 16 0 0 1 7.68-32h2.4a16 16 0 0 1 11.84 19.04 16 16 0 0 1-15.52 12.96zM496 727.52a992 992 0 0 1-172.8-14.4 16 16 0 0 1-13.6-18.56 16 16 0 0 1 17.6-13.12 958.4 958.4 0 0 0 168.8 14.24c103.84 0 204-16 274.72-42.56a16 16 0 1 1 11.36 29.6c-75.84 28.96-177.44 44.8-286.08 44.8zM812.8 667.36a16 16 0 0 1-14.08-8.48 16 16 0 0 1 6.72-21.6c38.08-19.84 59.04-42.72 59.04-64 0-40.48-70.08-81.44-178.56-104.16a16 16 0 0 1 6.56-31.2C820.16 464 896 514.88 896 572.8c0 24.16-13.28 59.84-76.16 92.8a17.76 17.76 0 0 1-7.04 1.76z" fill="" p-id="2260"></path><path d="M628.96 514.72a16 16 0 0 1-4-32A244.96 244.96 0 0 0 675.68 464a16 16 0 0 1 14.24-10.08 16 16 0 0 1 16 16v13.6l-7.52 4.64a261.76 261.76 0 0 1-65.92 26.08 17.12 17.12 0 0 1-3.52 0.48zM496 530.4c-83.68 0-160-16-203.36-42.24l-7.68-4.64v-13.76A16 16 0 0 1 315.2 464c39.68 21.12 107.68 33.92 180.32 33.92a586.88 586.88 0 0 0 65.76-3.52l17.28-2.24a16 16 0 0 1 18.08 13.44 16 16 0 0 1-13.44 18.08l-18.4 2.4a651.36 651.36 0 0 1-68.8 4.32z" fill="" p-id="2261"></path><path d="M379.52 405.44a8.32 8.32 0 0 1-2.72 0 10.72 10.72 0 0 1-7.52-12.96A101.12 101.12 0 0 1 419.84 336a10.4 10.4 0 0 1 14.08 4.96 10.72 10.72 0 0 1-4.96 14.24 80 80 0 0 0-39.2 42.88 10.56 10.56 0 0 1-10.24 7.36z" fill="#FFFFFF" p-id="2262"></path><path d="M370.56 421.76m-10.24 0a10.24 10.24 0 1 0 20.48 0 10.24 10.24 0 1 0-20.48 0Z" fill="#FFFFFF" p-id="2263"></path><path d="M226.08 621.44H224a101.76 101.76 0 0 1-59.36-47.2 10.72 10.72 0 0 1 18.72-10.4 80 80 0 0 0 44.96 36.8 10.88 10.88 0 0 1 8.32 12.64 10.56 10.56 0 0 1-10.56 8.16z" fill="#EEC98A" p-id="2264"></path></svg>               */}
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