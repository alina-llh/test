import React, { Component } from 'react';

import { Row, Col, Statistic, Progress } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Card from '@comps/Card';
import { AreaChart, ColumnChart } from 'bizcharts';
import './index.less';

const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
};
const data = [
  { country: 'Europe', year: '1243', value: 350 },
  { country: 'Europe', year: '1435', value: 370 },
  { country: 'Europe', year: '1435', value: 400 },
  { country: 'Asia', year: '1750', value: 362 },
  { country: 'Asia', year: '1800', value: 435 },
];
const rowdata = [
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
  state = {
    loading: true,
  };
  render() {
    return (
      <Row gutter={[16, 16]}>
        <Col span={6} {...firstRowCol}>
          <Card
            title={
              <Statistic
                title="总销售额"
                prefix="￥"
                value={112893}
              ></Statistic>
            }
            footer={<span>日销售额 ￥12,423</span>}
          >
            <span>
              周同比12%
              <CaretUpOutlined style={{ color: 'red' }} />
            </span>
            <span style={{ marginLeft: 20 }}>
              日同比10%
              <CaretDownOutlined style={{ color: 'green' }} />
            </span>
          </Card>
        </Col>
        <Col span={6} {...firstRowCol}>
          <Card
            title={<Statistic title="访问量" value={204354}></Statistic>}
            footer={<span>日销售额 ￥12,423</span>}
          >
            {/* 面积图 */}
            <AreaChart
              data={data}
              // title={{
              //   visible: true,
              //   text: '百分比堆叠面积图',
              // }}
              color="hotpink"
              forceFit={true}
              smooth={true}
              padding="0"
              xAxis={{
                visible: false,
              }}
              yAxis={{
                visible: false,
              }}
              xField="year"
              yField="value"
            />
          </Card>
        </Col>
        <Col span={6} {...firstRowCol}>
          <Card
            title={<Statistic title="支付比数" value={34354}></Statistic>}
            footer={<span>转化率60%</span>}
          >
            <ColumnChart
              data={rowdata}
              forceFit
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
        <Col span={6} {...firstRowCol}>
          <Card
            title={<Statistic title="运营结果" value={43354}></Statistic>}
            footer={<span>转化率80.2%</span>}
          >
            <Progress
              percent={80.2}
              size="small"
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            ></Progress>
          </Card>
        </Col>
      </Row>
    );
  }
}
