var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)
Page({
    data:{
      list:null,
      modalHidden:true,
      loadHidden:true,
      toastHidden:true
    },
    onLoad: function(){
    
    },
    onReady:function(){
        util.getContactList(this);
    },
    modalTap: function(e) {
        this.setData({
            modalHidden: false
        })
    },
    modalChange:function(e){
        this.setData({
            modalHidden: true
        })
    },
    onPullDownRefresh:function(){
        this.setData({
            refresh:true,
        })
        util.getContactList(this); 
    },
    toastChange:function(){
        this.setData({
            toastHidden: true
        })
    },
    goPage:function(e){
        
        wx.navigateTo({
            url: '../user/user?'+
            'username='+e.currentTarget.dataset.username+
            '&friend_id='+e.currentTarget.dataset.id+
            '&phone='+e.currentTarget.dataset.phone+
            '&avatar='+e.currentTarget.dataset.avatar
        })
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
