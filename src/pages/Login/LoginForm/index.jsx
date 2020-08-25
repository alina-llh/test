import React, { Component, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Tabs, Message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '@redux/actions/login';
import { reqLogCode } from '@api/acl/login';

import './index.less';

const { TabPane } = Tabs;
const validator = (rule, value) => {
  return new Promise((resolve, reject) => {
    value = value.trim();

    if (
      !value ||
      value.length < 6 ||
      value.length > 16 ||
      !/^[0-9A-za-z]+$/.test(value)
    ) {
      return reject('请输入正确密码');
    }
    return resolve();
  });
};
function LoginForm(props) {
  // 状态
  const [showButton, setShowButton] = useState(true);
  // 倒计时值
  let [count, setCount] = useState(5);

  const [form] = Form.useForm();
  const onFinish = ({ username, password }) => {
    props.login(username, password).then((token) => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem('user_token', token);
      props.history.replace('/');
    });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };
  // 获取验证码
  const getCode = () => {
    form
      .validateFields(['phone'])
      .then(async (res) => {
        // 打印出正确的手机号value reqLogCode
        await reqLogCode(res);
        Message.success('获取验证码成功');
        //倒计时
        const timer = setInterval(() => {
          //
          setCount(--count);
          setShowButton(false);
          if (count < 0) {
            console.log(count);
            clearInterval(timer);
            setShowButton(true);
            setCount(5);
          }
        }, 1000);
      })
      .catch();
  };
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { max: 16, message: '请不要超过16位数' },
                { min: 4, message: '请不要少于4位数' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator }]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[\d]{10}$/, message: '请输入正确手机号' },
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={getCode}>
                  {showButton ? '获取验证码' : count}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined className="login-icon" />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}

export default withRouter(
  connect(null, {
    login,
  })(LoginForm)
);
