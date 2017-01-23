//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
Page({
  data: {
    user: {},
    list: null,
    refresh:false,
  },
  //事件处理函数

  // 打电话
  makePhoneCall: function(){
      util.makePhoneCall(this)
  },
  onLoad: function(option){
    var name = option.username
    this.setData({
      user:option
    })
    wx.setNavigationBarTitle({
       title: name
    })
  
    util.getContactRecordItem(this)
   
    console.log(this.data.user)
  },
  onHide:function(){
    //  console.log('onHide',new Date())
  },
  onShow:function(){
    //  console.log('onShow',new Date())
  },
  onPullDownRefresh:function(){
        this.setData({
            refresh:true,
        })
        util.getContactRecordItem(this);
        
   }
})