import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Select, message, Switch, Upload } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import * as qiniu from 'qiniu-js'
import MyUpload from './Upload'

// API
import { addUploadtoken } from '@api/edu/lesson'
//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}

export default class index extends Component {
  // 提交按钮
  handelFinish = async (values) => {
    values.chapterId = this.props.location.state
    await addUploadtoken(values)
    message.success('添加成功')
    // 跳转list页面
    this.props.history.push('/edu/chapter/list')
  }
  render () {
    console.log(this.props.location);

    return (
      <>
        <Card title={
          <>
            <Link to="/edu/chapter/list">
              <ArrowLeftOutlined />
              <span>新增课时</span>
            </Link>
          </>
        }>
          <Form  {...layout} name='subject' initialValues={{ free: false }} onFinish={this.handelFinish}
          >
            <Form.Item
              label='课时名称'
              name='title'
              rules={[
                {
                  required: true,
                  message: '请输入课时!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='是否免费' name='free' valuePropName='checked' rules={[{
              required: true,
              message: '请输入是否免费!'
            }]} >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />

            </Form.Item>
            <Form.Item label='视频' name='video' rules={[{
              required: true,
              message: '请输入上传视频!'
            }]} >
              {/* 自定义的myUpload */}
              <MyUpload></MyUpload>
            </Form.Item>


            <Form.Item>
              <Button type='primary' htmlType='submit' >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    )
  }
}
