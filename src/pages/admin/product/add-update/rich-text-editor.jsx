import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'//修改了其中两个下拉框的高度
/**
 * 富文本编辑器的组件
 */
// 默认情况下，不能在函数组件上使用 ref 属性，因为它们没有实例。
// 解决办法就是使用forwardRef和useImperativeHandle。
const RichTextEditor = forwardRef((props, ref) => {
  const { detail } = props
  let editorState1 = EditorState.createEmpty()// 创建一个没有内容的编辑对象
  if (detail) { // 如果有值, 根据html格式字符串创建一个对应的编辑对象
    const contentBlock = htmlToDraft(detail)
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    editorState1 = EditorState.createWithContent(contentState)
  } 
  
  const [editorState,setEditorState] =useState(editorState1)

  //将子组件的方法 暴露给父组件
  useImperativeHandle(ref, () => ({
    getDetail
  }))
  const getDetail = () => {
    // 返回输入数据对应的html格式的文本
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  // 输入过程中实时的回调
  const onEditorStateChange = (editorState) => {
    // console.log('onEditorStateChange()')
    setEditorState(editorState)
  }
  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/manage/img/upload')
        const data = new FormData()
        data.append('image', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText)
          const url = response.data.url // 得到图片的url
          resolve({data: {link: url}})
        })
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText)
          reject(error)
        })
      }
    )
  }
  
  return (
    <Editor
        editorState={editorState}
        // 文本框样式
        editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: { uploadCallback:uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
  )

})

RichTextEditor.propTypes = { 
  detail: PropTypes.string
}

export default RichTextEditor