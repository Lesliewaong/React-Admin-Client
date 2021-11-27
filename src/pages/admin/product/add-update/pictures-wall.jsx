import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from "../../../../utils/constants";
import { reqDeleteImg } from '../../../../api/index'
/**
 * 用于图片上传的组件
 */
// 默认情况下，不能在函数组件上使用 ref 属性，因为它们没有实例。
// 解决办法就是使用forwardRef和useImperativeHandle。
const PicturesWall = forwardRef((props, ref) => {
  const { imgs } = props
  // 添加时图片信息为空数组，修改时获得当前修改项的图片信息
  let fileList1 = []
  if (imgs && imgs.length > 0) {
    fileList1 = imgs.map((img, index) => ({
      uid: -index, // 每个file都有自己唯一的id
      name: img, // 图片文件名
      status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
      url: BASE_IMG_URL + img
    }))
  }
  const [previewVisible, setPreviewVisible] = useState(false)// 标识是否显示大图预览Modal
  const [previewImage, setPreviewImage] = useState('')// 大图的url
  const [fileList, setFileList] = useState(fileList1)//图片信息

  
  //将子组件的方法 暴露给父组件
  useImperativeHandle(ref, () => ({
    getImgs
  }))
  // 获取所有已上传图片文件名的数组
  const getImgs = () => {
    return fileList.map(file => file.name)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  /*
  隐藏Modal
   */
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = file => {
    console.log('handlePreview()', file)
    // 显示指定file对应的大图
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
  }

  /*
  file: 当前操作的图片文件(上传/删除)
  fileList: 所有已上传图片文件对象的数组
   */
  const handleChange = async ({ file, fileList }) => {
    console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])
    console.log(fileList)
    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === 'done') {
      const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if (result.status === 0) {
        message.success('上传图片成功!')
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status === 'removed') { // 删除图片
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除图片成功!')
      } else {
        message.error('删除图片失败!')
      }
    }
    // 在操作(上传/删除)过程中更新fileList状态
    setFileList(fileList)
  };

  return (
    <div>
      <Upload
        action="/manage/img/upload" /*上传图片的接口地址*/
        accept='image/*'  /*只接收图片格式*/
        name='image' /*请求参数名*/
        listType="picture-card"  /*卡片样式*/
        fileList={fileList}  /*所有已上传图片文件对象的数组*/
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )

})

PicturesWall.propTypes = {
  imgs: PropTypes.array

}

export default PicturesWall