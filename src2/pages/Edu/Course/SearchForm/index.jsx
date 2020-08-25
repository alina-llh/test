import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Cascader, Button } from 'antd';
import { connect } from 'react-redux';

// 在要实现国际化的页面中
// 引入FormattedMessage
import { FormattedMessage, useIntl } from 'react-intl';

import { reqGetAllTeacherList } from '@api/edu/teacher';
import { reqSubject, reqEduSubject } from '@api/edu/subject';
import { getCourseAllList } from '../redux';
import './index.less';
const { Option } = Select;

function SearchForm(props) {
  const intl = useIntl();

  const [form] = Form.useForm();

  // 定义teacher数据
  const [teacher, setTeacher] = useState([]);
  const [options, setOptions] = useState([]);
  // 添加生命周期钩子
  useEffect(() => {
    async function fetchData() {
      // 发请求获取数据
      const [teachers, subject] = await Promise.all([
        reqGetAllTeacherList(),
        reqSubject(),
      ]);
      const subjects = subject.map((item) => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false,
        };
      });
      setTeacher(teachers);
      setOptions(subjects);
    }
    fetchData();
  }, []);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async (selectedOptions) => {
    // selectedOptions 所有选中的id
    // 但前选中的id
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 发请求获取数据reqEduSubject
    const res = await reqEduSubject(targetOption.value);
    targetOption.loading = false;
    if (res.items.length) {
      // 选中这一项加children属性
      targetOption.children = res.items.map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      });
    } else {
      targetOption.isLeaf = true;
    }
    // 重新渲染页面
    setOptions([...options]);
    // // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false;
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: 'dynamic1',
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: 'dynamic2',
    //     },
    //   ];
    //   setOptions([...options]);
    // }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
  };

  // 提交按钮
  const onFinish = async () => {
    console.log(111);
    // 发送请求，修改redux数据
    await props.getCourseAllList();
    // console.log(props);
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id={'title'} />}>
        <Input
          placeholder={intl.formatMessage({
            id: 'title',
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacher.map((item) => (
            <Option value={item._id} key={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: '0 10px 0 30px' }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseAllList })(SearchForm);
