import React, { Component } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

// API 
import { reqGetUploadtoken } from '@api/edu/lesson'

export default class index extends Component {
  constructor() {
    super()
    const token = localStorage.getItem('Upload_TOKEN')
    this.state = {
      // 控制上传视频是否显示
      isShowUpload: true
    }
    //token 存在则保存,不存在复制一个空对象
    if (token) {
      this.ObjToken = JSON.parse(token)
      return
    }
    this.ObjToken = {}
  }

  // 上传前

  handelBeforeUpload = (file) => {
    // file, onError, onProgress,onSuccess
    const MaxSize = 1024 * 1024 * 5
    // 返回Promise
    return new Promise(async (reslove, reject) => {
      // 文件比最大字节大则直接返回失败的Promise
      if (file.size > MaxSize) {
        return reject()
      }
      // 如果超时不在发请求 截至时间大于当前时间不发请求 小于的话发请求重新获取token
      if (this.ObjToken.expires > Date.now()) {
        return reslove()
      }
      // 成功获取token 保存
      const res = await reqGetUploadtoken()
      console.log(res);
      // 计算超时时间
      // expires: 7200s 转换为毫秒7200s*1000
      // uploadToken: "GmFFMHkAng5ZpCJBhRCptbXVl43irkoDxAQG3hmg:iB-h3skMB
      //截至时间 当前毫秒+可超时毫秒-2分钟的损耗
      res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
      const token = JSON.stringify(res)
      this.ObjToken = localStorage.setItem('Upload_TOKEN', token)


      return reslove()
    })

  }
  // 删除按钮触发的回调函数
  handelRemove = () => {
    // 取消上传
    this.props.onChange('')
    // 显示上传按钮
    this.setState({
      isShowUpload: true
    })
  }

  //如果 上传前返回的是成功的promise或者true才执行之后代码
  handelCustomRequest = ({ file, onError, onProgress, onSuccess }) => {
    // file, onError, onProgress, onSuccess 文件 文件上传失败 文件上传中 文件上传陈公公
    console.log(file);
    const observer = {
      // 上传中
      next (res) {
        //上传中 传递的必须要时一个对象
        onProgress({ percent: res.percent })
      },
      // 上传失败
      error (err) {
        onError(err)
      },
      // 上传成功
      complete: (res) => {
        onSuccess(res)
        // 提交成功 触发onchange事件
        this.props.onChange('http://qfek8bj7i.hn-bkt.clouddn.com/' + res.key)
        // 不显示上传按钮
        this.setState({
          isShowUpload: false
        })
      }
    }
    // 创建一个字节长度为10的唯一值
    const key = nanoid(10)
    const token = this.ObjToken.uploadToken
    const config = {
      region: qiniu.region.z2
    };
    const putExtra = {
      // 上传类型 所有video类型
      mimeType: "video/*",
    };
    const observable = qiniu.upload(file, key, token, putExtra, config)
    // 订阅上传开始
    this.observer = observable.subscribe(observer)
  }
  // 卸载时取消订阅 并且判断 是否存在订阅
  componentDidMount () {
    this.observer && this.observer.unsubscribe()
  }
  render () {
    return (
      <div>
        <Upload beforeUpload={this.handelBeforeUpload} customRequest={this.handelCustomRequest} onRemove={this.handelRemove} >
          {this.state.isShowUpload && <Button>
            <UploadOutlined /> 上传视频
               </Button>}
        </Upload>
      </div>
    )
  }
}
