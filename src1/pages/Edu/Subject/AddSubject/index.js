import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqGetSubject, reqAddSubject } from '@api/edu/subject'

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
  page = 1
  state = {
    total: 1,
    items: []
  }
  async componentDidMount () {
    let res = await reqGetSubject(this.page++, 5)
    console.log(res)
    this.setState(res)
  }
  // 更多数据张开
  moreData = async () => {
    let res = await reqGetSubject(this.page++, 5)
    let newState = [...this.state.items, ...res.items]
    this.setState({ items: newState })
  }
  // 点击提交按钮
  onFinish = async values => {
    // 发送请求
    await reqAddSubject(values.subjectname, values.parentid)
    message.success('添加成功');
    // 跳转到列表页面
    this.props.history.push("/edu/subject/list")
  }

  render () {
    return (
      <>
        <Card title={
          <>
            <Link to="/edu/subject/list">
              <ArrowLeftOutlined />
              <span>新增课程</span>
            </Link>
          </>
        }>
          <Form
            {...layout}
            name='subject'
            onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='课程名称'
              name='subjectname'
              rules={[
                {
                  required: true,
                  message: '请输入课程分类!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='父级分类'
              name='parentid'
              rules={[
                {
                  required: true,
                  message: '请选择分类id'
                }
              ]}
            >
              <Select dropdownRender={meun =>
                <>
                  {meun}
                  {this.state.total <= this.state.items.length ? '没有更多数据' : <Button type='link' onClick={this.moreData}>更多数据 </Button>}
                </>
              }>
                <Select.Option value={0} key={0}>
                  {'一级菜单'}
                </Select.Option>

                {this.state.items.map(item => <Select.Option value={item._id} key={item._id}>
                  {item.title}
                </Select.Option>)}
              </Select>
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
