import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Cascader, Button } from 'antd';

import './index.less';
import { getSubject, reqEduSubject } from '@api/edu/subject';
import { getTeacher } from '@api/edu/teacher';
const { Option } = Select;

function SearchForm() {
  const [form] = Form.useForm();
  // http://localhost:5000/admin/edu/teacher/list

  const [options, setOptions] = useState([]); //所有课程数据
  // const [subject, setSubject] = useState([]); //所有课程数据
  const [teacher, setTeacher] = useState([]); //所有老师数据
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

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
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

export default SearchForm;
