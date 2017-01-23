var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)

Page({
    data:{
      list:null,
      userInfo:null,
      refresh:false,
      onHide:false,
      toastHidden:true,
      viewHidden:false,
      search:{
        inputShowed: false,
        inputVal: "",
        list:[]
      }
    },
    onLoad: function () {
        console.log('index load')
        var _this = this
        app.loginServer(function(res){
            util.getContactRecord(_this);
        })
        
    },
    onHide: function(){
        this.setData({
            onHide: true
        })
        
    },
    onShow: function(){
      
        if(app.globalData.newPhoneRecord){
            console.log('onShow')
            util.getContactRecord(this);
            app.globalData.newPhoneRecord = false
        }
        
    },
    // onReady:function(){
    //     util.getContactRecord(this);
    // },
    goPage:function(e){
    
        wx.navigateTo({
            url: '../user/user?'+
            'username='+e.currentTarget.dataset.name+
            '&friend_id='+e.currentTarget.dataset.id+
            '&phone='+e.currentTarget.dataset.phone
        })
        // console.log('goPage');
    },
    toastChange:function(){
        this.setData({
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
        

       // console.log('list:',this.data.list)
        var resList = util.searchUserData(this.data.list,e.detail.value+'')
        this.setData({
             search:{
                 inputVal: e.detail.value,
                 list:resList
             }
        });

        // console.log('resList',resList)
    }
})
