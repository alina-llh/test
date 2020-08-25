import React, { Component } from 'react'
import { Button, Card, DatePicker } from 'antd'
import moment from 'moment';
const { RangePicker } = DatePicker;

const tabListNoTitle = [{
  key: 'scales',
  tab: '销售量'
},
{
  key: 'visits',
  tab: '访问量'
}]


export default class index extends Component {
  state = {
    noTitleKey: 'scales',
    dateType: 'day',
    timeDate: [moment(), moment()]
  }
  tabChange = (key) => {
    this.setState({
      noTitleKey: key
    })
  }
  handelDateChange = (date) => () => {
    let timeDate = []
    switch (date) {
      case 'day':
        timeDate = [moment(), moment()]
        break;
      case 'week':
        timeDate = [moment(), moment().add(7, 'd')]
        break;
      case 'month':
        timeDate = [moment(), moment().add(1, 'M')]
        break;
      case 'year':
        timeDate = [moment(), moment().add(1, 'y')]
        break;
      default:
        break;
    }
    this.setState({
      dateType: date,
      timeDate
    })
  }
  changeDate = (timeDate) => {
    this.setState({
      timeDate
    })
  }
  render () {
    const contentListNoTitle = {
      scales: <p>scales content</p>,
      visits: <p>visits content</p>
    }
    const tabBarExtraContent = (
      <>
        <Button type={this.state.dateType === 'day' ? 'link' : 'text'} onClick={this.handelDateChange('day')} >今日</Button>
        <Button type={this.state.dateType === 'week' ? 'link' : 'text'} onClick={this.handelDateChange('week')} > 本周</Button>
        <Button type={this.state.dateType === 'month' ? 'link' : 'text'} onClick={this.handelDateChange('month')}>本月</Button>
        <Button type={this.state.dateType === 'year' ? 'link' : 'text'} onClick={this.handelDateChange('year')}>本年</Button>
        <RangePicker value={this.state.timeDate} onChange={this.changeDate} />
      </>
    )
    return (

      <div>
        <Card style={{ width: '100%' }} tabList={tabListNoTitle} activeTabKey={this.state.noTitleKey} onTabChange={this.tabChange} tabBarExtraContent={tabBarExtraContent}>
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}
