var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)

Page({
    data:{
      list:null,
      modalHidden:true,
      refresh:false,
      loadHidden:true,
      toastHidden:true,
      viewHidden:false,
      search:{
        inputShowed: false,
        inputVal: ""
      }
    },
    onLoad: function () {
        //  util.getContactRecord(this);
    },
    onReady:function(){
        util.getContactRecord(this);
    },
    goPage:function(e){
    
        wx.navigateTo({
            url: '../user/user?'+
            'username='+e.currentTarget.dataset.username+
            '&friend_id='+e.currentTarget.dataset.id+
            '&phone='+e.currentTarget.dataset.phone
        })
        // console.log(test);
    },
    toastChange:function(){
        this.setData({
            loadHidden: true,
            toastHidden: true
        })
    },
    onPullDownRefresh:function(){
        this.setData({
            refresh:true,
        })
        util.getContactRecord(this);
        
    },
    showInput: function () {
        this.setData({
            viewHidden:true,
            search:{inputShowed: true}
        });
    },
    hideInput: function () {
        this.setData({
            viewHidden:false,
            search:{inputVal: "",
            inputShowed: false}
        });
    },
    clearInput: function () {
        this.setData({
            viewHidden:false,
            search:{inputVal: ""}
        });
    },
    inputTyping: function (e) {
        this.setData({
        search:{inputVal: e.detail.value}
        });
    }
})
