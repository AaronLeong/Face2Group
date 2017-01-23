var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)

Page({
    data: {
        list: null,
        groupId: null,
        groupName: '群聊',
        modalHidden: true,

        toastHidden: true
    },
    onLoad: function (option) {
        console.log(option)
        this.setData({
            groupId: option.group_id
        })
    },
    onReady: function () {
        util.getGroupMember(this);
    },
    onShow: function () {
        var key = 'group' + this.data.groupId
        var historyData = wx.getStorageSync(key)
        if ((!historyData) && this.data.onHide) {
            util.getContactRecord(this);
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
        util.getGroupMember(this);
    },
    goPage: function (e) {
        var url = 'username='
            + e.currentTarget.dataset.name +
            "&friend_id=" + e.currentTarget.dataset.id +
            '&phone=' + e.currentTarget.dataset.phone +
            '&avatar=' + e.currentTarget.dataset.avatar

        //  console.log(url);
        wx.navigateTo({
            url: '../user/user?' +
            'username=' + e.currentTarget.dataset.name +
            "&friend_id=" + e.currentTarget.dataset.id +
            '&phone=' + e.currentTarget.dataset.phone +
            '&avatar=' + e.currentTarget.dataset.avatar
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
        var resList = util.searchUserData(this.data.list, e.detail.value + '')
        this.setData({
            search: {
                inputVal: e.detail.value,
                list: resList
            }
        });
    }
})
