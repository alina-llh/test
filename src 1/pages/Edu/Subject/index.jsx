import React, { Component } from 'react'
import { Button, Table, Tooltip } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getSubjectList,getEduSubjectList } from './redux'

import './index.less'

const columns = [
  /**
   * title: 表示这一列的标题
   * dataIndex: 表示这一列中要展示data数据的中哪一项值
   * key: 唯一id
   */
  // 注意: 后台返回的数据,课程分类名称的属性是title.不是name.所以记得改一下
  { title: '分类名称', dataIndex: 'title', key: 'name' },
  {
    title: '操作',
    // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
    // dataIndex: 'age',
    key: 'x',
    render: () => (
      <>
        <Tooltip title='更新课程'>
          <Button
            type='primary'
            icon={<FormOutlined />}
            style={{ marginRight: 20, width: 40 }}
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
    ),
    width: 200
  }
]

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
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList,getEduSubjectList }
)
class Subject extends Component {
  // 当前
  page=1
  componentDidMount() {
    // 组件挂载的时候,去调用异步anction,发送请求
    this.props.getSubjectList(1, 10)
  }

  // 页码发生变化时,触发的回调函数
  handleChange = (page, pageSize) => {
    this.page=page
    this.props.getSubjectList(page, pageSize)
  }
  // 个数发生变化的回调
  handleShowSizeChange = (page, pageSize) => {
    // this.page=page
    // console.log(pa1ge, pageSize)
    this.props.getSubjectList(page, pageSize)
  }
  // 展开选项的变化
  handleonExpandChange=(expanded, record)=>{
    // expanded如果是展开则发送请求
    if(expanded){
      this.props.getEduSubjectList(record._id)
    }
  }
  render() {
    // console.log(this.props)
    return (
      <div className='subject'>
        <Button type='primary' icon={<PlusOutlined />} className='subject-btn'>
          新建
        </Button>

        <Table
          // 表示表格的列的数据
          columns={columns}
          expandable={{
            onExpand:this.handleonExpandChange//点击展开的变化
          }}
          dataSource={this.props.subjectList.items}
          // 注意: table组件,在渲染数据的时候,默认使dataSource数据中的key属性的值作为底层列表渲染key的值. 但是我们后台返回的数据没有key属性.table组件支持,我们通过rowkey指定使用我们自己数据中某个属性作为key的值
          rowKey='_id'
          pagination={{
            // 表示总共有多少条数据, pagination,底层默认一页是10条数据,所以数据是30条,就分3页
            total: this.props.subjectList.total,
            // 是否展示一页展示几条数据的修改项
            showSizeChanger: true,
            // 控制一页展示几条的选项
            pageSizeOptions: ['3', '5', '10'],
            // 展示快速跳转到那一页
            showQuickJumper: true,
            defaultPageSize: 10, // 默认分页器认为每页是10条,改为5条,
            // onChange: (page, pageSize) => {
            //   console.log(page, pageSize)
            // }
            // 是页码变化的时候会触发的回调函数
            onChange: this.handleChange,
            // 一页展示的数据条数变化的时候触发的函数
            onShowSizeChange: this.handleShowSizeChange,
            current:this.page
          }}
        />
      </div>
    )
  }
}

export default Subject
