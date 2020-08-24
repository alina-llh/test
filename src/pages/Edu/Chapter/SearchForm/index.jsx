import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import { connect } from 'react-redux'
import { courseList, getChapterList } from '../redux'
import "./index.less";

const { Option } = Select;

function SearchForm (props) {
  useEffect(() => {
    props.courseList()
    console.log(props);
  }, [])
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
  };
  const onFinish = async (value) => {
    // reqGetCourse 发送请求添加数据
    await props.getChapterList(value.chapterId)
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="chapterId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {props.getcourseList.map(item => <Option value={item._id} key={item._id}>{item.title}</Option>)}

        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(state => ({ getcourseList: state.chapter.courseList, chapterList: state.chapter.chapterList }), { courseList, getChapterList })(SearchForm);
