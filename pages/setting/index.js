//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
Page({
  //事件处理函数
  clearStorag: function () {
    wx.showNavigationBarLoading()
    wx.clearStorage()
    app.globalData.newPhoneRecord = true
    app.globalData.newContactList = true
    app.globalData.newGroupList = true
    setTimeout(function () {
      wx.navigateBack()
    }, 500)

  }
})