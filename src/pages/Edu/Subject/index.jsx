import React, { Component } from 'react'
import { Button, Table, Tooltip, Input, message } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getSubjectList, getEdujectList, getUpdateSubject } from './redux'

import { reqUpdateSubject } from '@api/edu/subject'
import './index.less'


const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]

// 使用高阶组件时,如果用修饰器语法: 传入展示组件的调用可以不写了
@connect(state => ({ subjectList: state.subjectList }), { getSubjectList, getEdujectList, getUpdateSubject })
class Subject extends Component {
  state = {
    subjectId: '',
    title: ''
  }
  page = 1
  componentDidMount () {
    // 发请求获取数据
    this.props.getSubjectList(1, 5)
  }
  // 点击展开按钮
  handelonExpand = (expanded, record) => {
    // console.log(expanded, record);
    if (expanded) {
      // 展开的话发请求给后台获取二级列表
      this.props.getEdujectList(record._id)
    }
  }
  //点击页码修改数据
  handelChange = (page, pagesize) => {
    this.page = page
    this.props.getSubjectList(page, pagesize)
  }
  // 点击修改页面个数
  handelShowSizeChange = (page, pagesize) => {
    this.page = page
    this.props.getSubjectList(page, pagesize)
  }
  // 点击新建按钮
  skipAddsubject = () => {
    console.log(this.props)
    this.props.history.push('/edu/subject/add')
  }
  // 更新课程 state中添加id
  updateCoures = ({ _id, title }) => () => {
    this.setState({ subjectId: _id, title })
    this.title = title
  }
  // input框框修改
  changeUpdateCoures = (e) => {

    this.setState({
      title: e.target.value
    })
  }
  // 取消按钮
  handelCancel = () => {
    this.setState({
      subjectId: '',
      title: ''
    })
  }
  // 确认按钮
  handelConfirm = async () => {
    if (!this.state.title.trim()) {
      message.success('请不要输入空信息');
      return
    }
    if (this.state.title === this.title) {
      message.success('请不要输入重复信息');
      return
    }
    let id = this.state.subjectId
    let title = this.state.title
    console.log(title)
    // 发请求 
    // await reqUpdateSubject(title, id)
    const result = await this.props.getUpdateSubject(title, id)
    if (result) {
      message.success('提交成功');
      this.setState({
        subjectId: '',
        title: ''
      })
    }
    

  }
  render () {

    const columns = [
      /**
       * title: 表示这一列的标题
       * dataIndex: 表示这一列中要展示data数据的中哪一项值
       * key: 唯一id
       */
      // 注意: 后台返回的数据,课程分类名称的属性是title.不是name.所以记得改一下
      {
        title: '分类名称', key: 'name',
        render: (record) => {
          if (this.state.subjectId === record._id) {
            return <Input value={this.state.title} style={{ width: 250 }} onChange={this.changeUpdateCoures}></Input>
          } else {
            return <span onClick={this.updateCoures(record)}>{record.title}</span>
          }

        }
      },
      {
        title: '操作',
        // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
        // dataIndex: 'age',
        key: 'x',
        render: (record) => {
          if (this.state.subjectId === record._id) {
            return (
              <>
                <Button type="primary" onClick={this.handelConfirm}>确认</Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handelCancel}> 取消</Button>
              </>
            )
          } else {
            return (
              <>
                <Tooltip title='更新课程'>
                  <Button
                    type='primary'
                    icon={<FormOutlined />}
                    style={{ marginRight: 20, width: 40 }}
                    onClick={this.updateCoures(record)}
                  // size='large'
                  // style={{ width: 40 }}
                  ></Button>
                </Tooltip>
                <Tooltip title='删除课程'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    // size='large'
                    style={{ width: 40 }}
                  ></Button>
                </Tooltip>
              </>
            )
          }

        },
        width: 200
      }
    ]
    return (
      <div className='subject'>
        <Button type='primary' icon={<PlusOutlined />} className='subject-btn' onClick={this.skipAddsubject}>
          新建
        </Button>

        <Table
          // 表示表格的列的数据
          columns={columns}
          rowKey='_id'
          dataSource={this.props.subjectList.items}
          expandable={{
            onExpand: this.handelonExpand
          }}
          pagination={{
            total: this.props.subjectList.total,//总页数
            defaultPageSize: 5,//默认每页显示个数
            pageSizeOptions: ['3', '5', '7'],
            current: this.page,// current控制分页器,哪个页码高亮
            showQuickJumper: true,//是否可以快速跳转至某页
            onChange: this.handelChange,//点击修改页码
            showSizeChanger: true,//是否展示 pageSize 切换器
            onShowSizeChange: this.handelShowSizeChange
          }}
        />
      </div>
    )
  }
}

export default Subject
