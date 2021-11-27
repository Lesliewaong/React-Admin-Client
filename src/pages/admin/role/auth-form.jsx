import React,{useState,useEffect} from 'react'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../../config/menuConfig'
const Item = Form.Item

export default function AuthForm(props) {
    const { role,getMenus } = props
    const {menus} = role
    const [checkedKeys, setCheckedKeys] = useState([]);
    const treeData = [
        {
          title: '平台权限',
          key: 'all',
          children:menuList
        }
    ]
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
        
      };
  
    useEffect(() => {
        setCheckedKeys(menus) 
     // eslint-disable-next-line  
    }, [menus])
    useEffect(() => {
        getMenus(checkedKeys)  
     // eslint-disable-next-line  
    }, [checkedKeys])
    
    return (
        <Form>
            <Item label='角色名称' >
                <Input value={role.name} disabled />
            </Item>
            <Tree
                checkable
                defaultExpandAll={true}//默认展开
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                treeData={treeData}
            />
        </Form>
    )
}
