import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

// API数据
import { reqGetSubject, reqAddSubject } from '@api/edu/subject'

export default class index extends Component {
  page = 1
  state = {
    items: [],
    total: 1
  }
  async componentDidMount () {
    const result = await reqGetSubject(this.page++, 5)
    this.setState(result)
    console.log(result)
  }
  // 点击更多发请求
  readMore = async () => {
    const result = await reqGetSubject(this.page++, 5)
    console.log(result)
    let newItem = [...this.state.items, ...result.items]
    this.setState({
      items: newItem
    })
  }
  // 提交按钮
  submitAdd = async (value) => {
    console.log(value)
    await reqAddSubject(value.subject, value.subjectId)
    console.log(this.props)
    message.info('添加成功');
    this.props.history.push('/edu/subject/list')
    await reqGetSubject(1, 5)
  }
  render () {
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
    };
    return (
      <>
        <Card title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 15 }}> 添加课程</span>
          </>
        }>
          {/* form表单 */}
          <Form  {...layout} onFinish={this.submitAdd}>
            <Form.Item label="新增课程" rules={[{ required: true, message: '请输入课程' }]} name='subject'>
              <Input />
            </Form.Item>
            {/* 下拉框 */}
            <Form.Item label="分类列表" rules={[{ required: true, message: '请选择分类' }]} name='subjectId'>
              <Select
                dropdownRender={meun => {
                  return <>
                    {meun}
                    {this.state.total <= this.state.items.length ? '' : <Button type='link' onClick={this.readMore}>展示更多</Button>}
                  </>
                }}
              >
                <Select.Option value={0} key={0}>一级分类</Select.Option>
                {this.state.items.map(item => <Select.Option key={item._id} value={item._id} >{item.title}</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item label="分类列表" rules={[{ required: true, message: '请选择分类' }]}>
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
