import React, { Component } from 'react';
import { Button, message, Tooltip, Modal, Alert, Table } from 'antd';
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Player from 'griffith';

import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import { LessonList, delChapterLists, delLessonLists } from './redux';

import './index.less';

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    chapterlist: state.chapter.chapterlist,
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
  }),
  { LessonList, delChapterLists, delLessonLists }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: '',
    selectedRowKeys: [],
    play_url: '',
  };

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      });
    };
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning('暂无用户列表数据');
          return;
        }
        message.success('获取用户列表数据成功');
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys, //选中的id数组
    });
  };
  // 点击展开按钮 +
  onExpand = (expanded, record) => {
    // 展开才执行之后的代码
    if (expanded) {
      this.props.LessonList(record._id);
    }
  };

  //跳转到添加页面
  handelGoToAddLesson = (data) => () => {
    console.log(this.props.history, data._id);
    this.props.history.push('/edu/chapter/addlesson', data._id);
  };

  // 点击预览视频按钮
  handeProvieVideo = (record) => () => {
    console.log(record.video);
    this.setState({
      play_url: record.video,
      previewVisible: true,
    });
  };

  // 批量删除
  batchDel = async () => {
    // 拿到chapterlist
    const chapterIdList = [];

    this.props.chapterlist.forEach((item) => {
      if (this.state.selectedRowKeys.indexOf(item._id) > -1) {
        chapterIdList.push(item._id);
      }
    });
    // 获取lessonIdList
    const lessonIdList = this.state.selectedRowKeys.filter((item) => {
      if (chapterIdList.indexOf(item) > -1) {
        return false;
      }
      return true;
    });
    // delChapterLists, delLessonLists
    await this.props.delChapterLists(chapterIdList);
    await this.props.delLessonLists(lessonIdList);
    // console.log(chapterIdList, lessonIdList);
  };

  render() {
    const {
      previewVisible,
      previewImage,
      selectedRowKeys,
      play_url,
    } = this.state;
    const sources = {
      hd: {
        play_url: play_url,
      },
    };
    const columns = [
      {
        title: '章节名称',
        dataIndex: 'title',
      },
      {
        title: '是否免费',
        dataIndex: 'free',
        render: (isFree) => {
          return isFree === true ? '是' : isFree === false ? '否' : '';
        },
      },
      {
        title: '视频',
        render: (record) => {
          return record.free ? (
            <Button onClick={this.handeProvieVideo(record)}>预览视频</Button>
          ) : null;
        },
      },
      {
        title: '操作',
        width: 210,
        fixed: 'right',
        render: (data) => {
          return (
            <div>
              <Tooltip title="新增章节">
                <Button type="primary" onClick={this.handelGoToAddLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="更新章节">
                <Button type="primary" style={{ margin: '0 10px' }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除章节">
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
        },
      },
    ];

    const data = [
      {
        id: '111',
        title: '第一章节',
        children: [
          {
            id: '1',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645',
          },
          {
            id: '2',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1',
          },
          {
            id: '3',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d',
          },
        ],
      },
      {
        id: '222',
        title: '第二章节',
        children: [
          {
            id: '4',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645',
          },
          {
            id: '5',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1',
          },
          {
            id: '6',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d',
          },
        ],
      },
      {
        id: '333',
        title: '第三章节',
        children: [
          {
            id: '1192252824606289921',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645',
          },
          {
            id: '1192628092797730818',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1',
          },
          {
            id: '1192632495013380097',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d',
          },
        ],
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button
                type="danger"
                style={{ marginRight: 10 }}
                onClick={this.batchDel}
              >
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: '#1890ff' }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterlist}
            rowKey="_id"
            expandable={{
              onExpand: this.onExpand,
            }}
          />
        </div>

        <Modal
          visible={previewVisible}
          title="预览视频"
          footer={null}
          onCancel={this.handleImgModal}
          destroyOnClose={true}
        >
          {/* <img alt="example" style={{ width: '100%' }} src={previewImage} /> */}
          <Player sources={sources} />
        </Modal>
      </div>
    );
  }
}

export default Chapter;
