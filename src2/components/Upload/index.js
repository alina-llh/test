import React, { Component } from 'react'
import { Button, Upload } from 'antd'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'
import { UploadOutlined } from '@ant-design/icons'

import { reqUploadtoken } from '@api/edu/lesson'
export default class index extends Component {
  constructor() {
    super()
    // 判断tokenl是否存在
    let jsonStr = localStorage.getItem('uplodToken')
    if (jsonStr) {
      this.tokenObj = JSON.parse(jsonStr)
    }
    this.tokenObj = {}
  }
  handelBeforeUpload = (file) => {
    const MAX_SIZE = 1024 * 1024 * 20
    return new Promise(async (resolve, reject) => {
      // 如果符合条件在截至时间内直接return
      if (this.tokenObj.expires > Date.now()) {
        return resolve()
      }
      if (file.size < MAX_SIZE) {
        const res = await reqUploadtoken()
        // 截止时间毫秒 损耗
        res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
        this.tokenObj = res
        let tokenStr = JSON.stringify(this.tokenObj)
        // 存储截止时间
        localStorage.setItem('uplodToken', tokenStr)
        return resolve()
      }


      return reject()
    })

  }

  handelCustomRequest = ({ file, onProgress, onError, onSuccess }) => {
    const observer = {
      // 上传中
      next (res) {
        console.log('上传中', res);
        onProgress({ onProgress: res.total.percent })
      },
      // 上传失败
      error (err) {
        // ...
        onError(err)
      },
      // 上传成功
      complete: (res) => {
        // 上传成功
        onSuccess(res)
        // 上传成功出发onchange事件 
        this.props.onChange('http://qfek8bj7i.hn-bkt.clouddn.com/' + res.key)
      }
    }
    // key nanoid 10个字节长度的的唯一值
    const key = nanoid(10)
    // token
    const token = this.tokenObj.uploadToken
    // putExtra上传类型
    const putExtra = {
      mimeType: 'video/*'
    }
    // 配置地区
    const config = {
      region: qiniu.region.z2
    }
    const observable = qiniu.upload(file, key, token, putExtra, config)
    // 上传订阅
    this.subscription = observable.subscribe(observer)
  }

  // 删除上传按钮
  handelOnRemove = () => {
    this.props.onChange('')
  }
  // 卸载
  componentDidUnMount () {
    //  this.subscription存在才执行取消订阅
    this.subscription && this.subscription.unsubscribe()
  }

  render () {
    return (
      <Upload beforeUpload={this.handelBeforeUpload} customRequest={this.handelCustomRequest} onRemove={this.handelOnRemove}>
        <Button>
          <UploadOutlined /> 上传视频
         </Button>
      </Upload>
    )
  }
}
