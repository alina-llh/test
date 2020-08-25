import React, { Component } from 'react';

import { Row, Col, Statistic, Progress } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { AreaChart, ColumnChart } from 'bizcharts';
import Card from '@comps/Card';
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
};
// 数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const columnData = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
export default class Analysis extends Component {
  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title={<Statistic title="总销售额" prefix="￥" value={112893} />}
            footer={<span>日销售额 ￥112893</span>}
          >
            <span style={{ marginRight: 10 }}>
              周同比 12% <CaretUpOutlined style={{ color: 'red' }} />
            </span>
            <span>
              周同比 10%
              <CaretDownOutlined style={{ color: 'green' }} />
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<Statistic title="访问量" prefix="￥" value={112893} />}
            footer={<span>日销售额 ￥112893</span>}
          >
            <AreaChart
              data={data}
              forceFit={true}
              padding="0"
              color="pink"
              xAxis={{
                // 水平坐标
                visible: false, //不显示
              }}
              yAxis={{
                // 水平坐标
                visible: false, //不显示
              }}
              smooth={true}
              xField="year"
              yField="value"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<Statistic title="支付笔数" value={31893} />}
            footer={'转化率70%'}
          >
            <ColumnChart
              data={columnData}
              padding="0"
              xField="type"
              yField="sales"
              xAxis={{
                visible: false,
              }}
              yAxis={{
                visible: false,
              }}
              meta={{
                type: {
                  alias: '类别',
                },
                sales: {
                  alias: '销售额(万)',
                },
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<Statistic title="运营结果" value={23251} />}
            footer={'转化率88.8%'}
          >
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={88.8}
              status="active"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
