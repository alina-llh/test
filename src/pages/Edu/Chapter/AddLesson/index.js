import React, { Component } from 'react'
import { Card, Form, Input, Button, Switch, message } from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import MyUpload from '@comps/Upload'

import { addLesson } from '@api/edu/lesson'

export default class index extends Component {

  onFinish = async (value) => {
    const chapterId = this.props.location.state
    const values = { ...value }
    values.chapterId = chapterId
    // 发请求
    await addLesson(values);
    message.success('添加成功')
    this.props.history.push('/edu/chapter/list')
  }
  render () {
    console.log(this.props);

    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
    };
    return (
      <>
        <Card title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 15 }}> 新增课时</span>
          </>
        }>
          {/* form表单 */}
          <Form  {...layout} onFinish={this.onFinish} initialValues={{ free: true }}>
            <Form.Item label="课时名称" rules={[{ required: true, message: '请输入课时' }]} name='title'>
              <Input />
            </Form.Item>
            <Form.Item label="是否免费" rules={[{ required: true, message: "是否免费" }]} name='free' valuePropName='checked' >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </Form.Item>
            <Form.Item label="上传视频" rules={[{ required: true, message: "是否上传视频" }]} name='video' >
              <MyUpload></MyUpload>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    )
  }
}
