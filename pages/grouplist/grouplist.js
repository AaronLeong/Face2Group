//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)

Page({
    data: {
        list: [],
        inputShowed: false,
        inputVal: "",
        modalHidden: true,
        refresh: false,
        loadHidden: true,
        toastHidden: true,
        url: null,
    },
    onLoad: function () {
        console.log('grouplist load')
        this.setData({
            url: app.globalData.urlStatic,
        })
    },
    onReady: function () {
        util.getGroupList(this);
    },
    onShow: function () {

        if (app.globalData.newGroupList) {
            console.log('onShow')
            util.getGroupList(this);
            app.globalData.newGroupList=false
        }
    },
    modalTap: function (e) {
        this.setData({
            modalHidden: false
        })
    },
    modalChange: function (e) {
        this.setData({
            modalHidden: true
        })
    },
    toastChange: function () {
        this.setData({
            loadHidden: true,
            toastHidden: true
        })
    },
    onPullDownRefresh: function () {
        this.setData({
            refresh: true,
        })
        util.getGroupList(this);

    },
    goUrl: function (e) {

        var url = e.currentTarget.dataset.url
        console.log(url)
        wx.navigateTo({
            url: url + ''
        })
    },
    goPage: function (e) {
        //    console.log(e)
        // var url =e.currentTarget.dataset.url
        var group_name = e.currentTarget.dataset.name;
        var group_id = e.currentTarget.dataset.id;

        wx.navigateTo({
            url: '../group/group?group_id=' + group_id + "&group_name=" + group_name
        })
    },
    showInput: function () {
        this.setData({
            viewHidden: true,
            search: { inputShowed: true }
        });
    },
    hideInput: function () {
        this.setData({
            viewHidden: false,
            search: {
                inputVal: "",
                inputShowed: false
            }
        });
    },
    clearInput: function () {
        this.setData({
            viewHidden: false,
            search: { inputVal: "" }
        });
    },
    inputTyping: function (e) {
        this.setData({
            search: { inputVal: e.detail.value }
        });

        var resList = util.searchGroupData(this.data.list, e.detail.value + '')
        this.setData({
            search: {
                inputVal: e.detail.value,
                list: resList
            }
        });

        // console.log('resList',resList)
    }
})
