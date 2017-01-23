//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
Page({
  data: {
    userInfo: {},
    settingData: {},
    inputVal:'',
    option: null
  },
  onLoad: function (option) {

    var that = this
    wx.setNavigationBarTitle({
      title: '编辑'+option.name
    })
    console.log(app.globalData.serUser)
    this.setData({
      option: option,
      inputVal:app.globalData.serUser[option.param]
    })
  },
  //事件处理函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      settingData: e.detail.value
    })
    util.setting(this)
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})