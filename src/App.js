import React from "react";
import { Router } from "react-router-dom";
import { connect } from 'react-redux'
import history from "@utils/history";
import { IntlProvider } from 'react-intl'
import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";
// 引入语言包
import { zh, en } from './locales'

function App (props) {
  const locale = props.intl
  const messages = locale === 'zh' ? zh : en
  return (
    <Router history={history}>
      <IntlProvider locale={locale} messages={messages}>
        <Layout />
      </IntlProvider>
    </Router>
  );
}

export default connect(state => ({ intl: state.intl }))(App);
