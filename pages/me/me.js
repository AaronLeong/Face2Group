//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
Page({
  data: {
    userInfo: {},
    list:[
            {
                list_tool:[
                    {
                        img:"/src/image/phone.png",
                        name:"电话",
                        param:"phone",
                        type:"number",
                        url:"../edit/index"
                    },
                    {
                        img:"/src/image/name.png",
                        name:"姓名",
                        param:"username",
                        type:"text",
                        url:"../edit/index"
                    }
                ]
            },
            {
                list_tool:[
                    {
                        img:"/src/image/help.png",
                        name:"帮助",
                        url:"../help/index"
                    },
                    {
                        img:"../../src/image/trash.png",
                        name:"清理缓存",
                        url:"../setting/index"
                    }
                ]
            },
        ]
  },
  //事件处理函数
  settingTap: function() {
    wx.navigateTo({
      url: '../setting/index'
    })
  },
  goUrl:function(e){
        var url =e.currentTarget.dataset.url
        var name =e.currentTarget.dataset.name
        var param =e.currentTarget.dataset.param
        var type =e.currentTarget.dataset.type
       
        wx.navigateTo({
             url: url+'?name='+name+'&param='+param+'&type='+type
        })
    },
  onLoad: function(){
    console.log('me load')
    let that = this
    app.getUserInfo(function(userInfo){
        console.log('onLoaduserInfo',userInfo)
        that.setData({
            userInfo:userInfo
        })
    })
    
  }
})

