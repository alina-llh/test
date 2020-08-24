import React from "react";
import { connect } from 'react-redux'
import { Router } from "react-router-dom";
import history from "@utils/history";

import Layout from "./layouts";

// 国际化
import { IntlProvider } from 'react-intl'
import { zh, en } from './locales'
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";
// 在App.js组件中引入 ConfigProvider 组件
import { ConfigProvider } from 'antd'
// 引入antd中提供的语言包
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
function App (props) {
  const locale = props.intl
  const messages = locale === 'en' ? en : zh
  // antd语言包
  const antdMessages = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antdMessages}>
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect(state => ({ intl: state.intl }))(App);
