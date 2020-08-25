import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Cascader, Button } from 'antd';
import { connect } from 'react-redux';
import './index.less';
import { getSubject, reqEduSubject } from '@api/edu/subject';
import { getTeacher } from '@api/edu/teacher';
import { getCourseList } from '../redux';
// 在要实现国际化的页面中
// 引入FormattedMessage
import { FormattedMessage, useIntl } from 'react-intl';
const { Option } = Select;
function SearchForm(props) {
  const [form] = Form.useForm();
  // http://localhost:5000/admin/edu/teacher/list

  const [options, setOptions] = useState([]); //所有课程数据
  // const [subject, setSubject] = useState([]); //所有课程数据
  const [teacher, setTeacher] = useState([]); //所有老师数据
  const intl = useIntl();

  // 模拟生命周期钩子
  useEffect(() => {
    async function deteNow() {
      const [getSubjectList, getTeacherList] = await Promise.all([
        getSubject(),
        getTeacher(),
      ]);
      const newSubjectList = getSubjectList.map((item) => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false,
        };
      });
      setOptions(newSubjectList);
      setTeacher(getTeacherList);
    }

    deteNow();
  }, []);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 请求之前打开 加载图标
    targetOption.loading = true;
    // 拿到的是选中的数组
    console.log(targetOption);
    const res = await reqEduSubject(targetOption.value);
    // 停止加载图标
    targetOption.loading = false;
    if (res.items.length) {
      // 遍历获取到的数据加载到当前项的chilren上
      targetOption.children = res.items.map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      });
    } else {
      // 不展示小箭头 没有二级
      targetOption.isLeaf = true;
    }
    //视图重新渲染
    setOptions([...options]);
  };

  const resetForm = () => {
    form.resetFields();
  };
  const onFinish = () => {
    // 发请求获取保存数据在redux中
    props.getCourseList();
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input
          placeholder={intl.formatMessage({
            id: 'title',
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: 'teacher',
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacher.map((item) => {
            return (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="subject"
        label="分类"
        label={<FormattedMessage id="subject" />}
      >
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: 'subject',
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: '0 10px 0 30px' }}
        >
          <FormattedMessage id="searchBtn"></FormattedMessage>
        </Button>
        <Button onClick={resetForm}>
          <FormattedMessage id="resetBtn"></FormattedMessage>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(SearchForm);
