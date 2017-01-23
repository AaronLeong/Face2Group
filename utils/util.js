var app = getApp()

function formatTime(date) {

    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().substr(0, 17)
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatTimeStamp(timestamp) {
    var today = new Date()
    var date = new Date(parseInt(timestamp))
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()


    var today_year = today.getFullYear()
    var today_month = today.getMonth() + 1
    var today_day = today.getDate()
    var formatData;
    if (today_year == year && today_month == month && today_day == day) {
        var hour = date.getHours()
        var minute = date.getMinutes()
        // var second = date.getSeconds()
        formatData = [hour, minute].join(':')
    } else if (today_year == year && today_month == month) {
        formatData = [month, day].join('-')
    } else {
        formatData = [year, month, day].map(formatNumber).join('-')
    }
    return formatData
}


function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function makePhoneCall(obj) {
    var phone = obj.data.user.phone
    console.log('start', new Date())
    wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
            console.log("成功拨打电话")
            app.globalData.newPhoneRecord = true
            console.log('end', new Date())
            addPhoneRecord(obj.data.user.friend_id)
        }
    })
}
function addPhoneRecord(friend_id) {
    var data = {
        user_id: app.globalData.authInfo.user_id,
        friend_id: friend_id
    }
    wx.request({
        url: app.globalData.url + 'addphonerecord',
        data: data,
        method: 'POST',
        success: function (res) {
            app.globalData.newPhoneRecord = true
        },
        fail: function (err) {
            console.log(err);
        }
    })
}

function getContactRecord(obj) {
    wx.showNavigationBarLoading()
    var historyData = wx.getStorageSync('contactRecord')
    console.log(historyData, obj.data.refresh)
    if (historyData.length > 0 && (!obj.data.refresh)) {
        wx.hideNavigationBarLoading()
        obj.setData({
            refresh: false,
            list: historyData,
            toastHidden: false,
            toastText: "拿到本地数据"
        })
    } else {

        var authInfo = app.globalData.authInfo
        console.log('authInfo', authInfo)
        if (authInfo == '' || authInfo == null) {
            return;
        }
        wx.request({
            url: app.globalData.url + 'recordlist',
            data: app.globalData.authInfo,
            method: 'GET',
            success: function (res) {
                console.log(res.data.errno)
                if (res.data.errno == 0) {
                    obj.setData({
                        list: res.data.data,
                        toastHidden: false,
                        toastText: "拿到云端数据"
                    })
                    console.log(res.data.data)

                    if (res.data.data.length > 0) {

                        wx.setStorageSync('contactRecord', res.data.data)
                    } else {
                        wx.setStorageSync('contactRecord', [])
                    }
                }
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
            },
            fail: function () {

                obj.setData({
                    list: res.data.data,
                    loadHidden: true,
                    toastHidden: false,
                    toastText: "请检查server"
                })
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
                console.log(err);
            },
            complete: function () {
                // complete
            }
        })
    }
}

function getContactRecordItem(obj) {
    wx.showNavigationBarLoading()
    var storageKey = 'record' + obj.data.user.friend_id
    var historyData = wx.getStorageSync(storageKey)
    console.log(historyData)
    if (historyData && (!obj.data.refresh)) {
        obj.setData({
            refresh: false,
            list: historyData,
            toastHidden: false,
            toastText: "拿到本地数据"
        })
        wx.hideNavigationBarLoading()
        console.log("拿到本地数据")
    } else {
        var data = obj.data.user
        data.user_id = app.globalData.authInfo.user_id
        console.log(data)
        wx.request({
            url: app.globalData.url + 'recorditem',
            data: data,
            method: 'GET',
            success: function (res) {
                console.log(res.data.data)
                if (res.data.errno == 0) {
                    //setStorage
                    wx.setStorageSync(storageKey, res.data.data)

                    obj.setData({
                        list: res.data.data,
                        toastHidden: false,
                        toastText: "拿到云端数据"
                    })
                }
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
            },
            fail: function () {

            },
            complete: function () {
                // complete
            }
        })
    }
}

function getContactList(obj) {
    wx.showNavigationBarLoading()
    var historyData = wx.getStorageSync('contactList')
    if (historyData && (!obj.data.refresh)) {
        obj.setData({
            refresh: false,
            list: historyData.connect,
            grouplist: historyData.group,

            toastHidden: false,
            toastText: "拿到本地数据"
        })
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
    } else {
        wx.request({
            url: app.globalData.url + 'contactlist',
            data: {
                user_id: app.globalData.authInfo.user_id
            },
            success: function (res) {
                if (res.data.errno == 0) {
                    obj.setData({
                        list: res.data.data.connect,
                        grouplist: res.data.data.group
                    })
                    // setStorage
                    wx.setStorageSync('contactList', res.data.data)
                    obj.setData({
                        toastHidden: false,
                        toastText: "拿到云端数据"
                    })
                }
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
            },
            fail: function (err) {
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
                console.log(err);
            }
        })
    }
}
function getGroupList(obj) {
    wx.showNavigationBarLoading()
    var historyData = wx.getStorageSync('groupList')

    if (historyData.length > 0 && (!obj.data.refresh)) {
        console.log(historyData, obj.data.refresh)
        obj.setData({
            refresh: false,
            list: historyData,
            toastHidden: false,
            toastText: "拿到本地数据"
        })
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
    } else {
        wx.request({
            url: app.globalData.url + 'grouplist',
            data: {
                user_id: app.globalData.authInfo.user_id
            },
            success: function (res) {
                if (res.data.errno == 0) {
                    var groupList = res.data.data.groupList
                    if (groupList.length > 0) {
                        obj.setData({
                            list: groupList
                        });

                    } else {
                        obj.setData({
                            list: null
                        });
                    }
                    wx.setStorageSync('groupList', groupList);
                    obj.setData({
                        toastHidden: false,
                        toastText: "拿到云端数据"
                    })
                }
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()

            },
            fail: function (err) {
                wx.stopPullDownRefresh()
                console.log(err);
            }
        })
    }
}

function getGroupMember(obj) {
    wx.showNavigationBarLoading()
    var key = 'group' + obj.data.groupId
    var historyData = wx.getStorageSync(key)
    if (historyData.length > 0 && (!obj.data.refresh)) {
        obj.setData({
            refresh: false,
            list: historyData,
            toastHidden: false,
            toastText: "拿到本地数据"
        })
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
    } else {
        wx.request({
            url: app.globalData.url + 'groupmember',
            data: {
                user_id: app.globalData.authInfo.user_id,
                group_id: obj.data.groupId
            },
            success: function (res) {
                if (res.data.errno == 0) {
                    var memberList = res.data.data.groupMember
                    if (memberList.length > 0) {
                        obj.setData({
                            list: memberList
                        })
                        // setStorage
                        wx.setStorageSync(key, memberList)
                    } else {
                        wx.setStorageSync(key, [])
                    }
                }
                obj.setData({
                    loadHidden: true,
                    toastHidden: false,
                    toastText: "拿到云端数据"
                })
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh()
            },
            fail: function (err) {
                wx.stopPullDownRefresh()
                console.log(err);
                wx.hideNavigationBarLoading()
            }
        })
    }
}
function joinGroup(obj) {
    wx.showNavigationBarLoading()
    app.getLocation(function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log('joinGroup', res)
        res.user_id = app.globalData.authInfo.user_id
        res.code = obj.data.code
        wx.request({
            url: app.globalData.url + 'creategroup',
            data: res,
            method: 'POST',
            success: function (res) {
                if (res.data.data.groupId) {
                    var memberList = res.data.data.memberList
                    //console.log(memberList)
                    app.getUserInfo(function (userInfo) {

                        //   console.log(userInfo)
                        memberList.push({ userinfo: [userInfo] })
                        obj.setData({
                            groupId: res.data.data.groupId,
                            groupName: res.data.data.groupName,
                            memberList: memberList,
                            memberListHidden: false,
                            selectHidden: false
                        })
                    })
                }
                // success
                //  wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
                console.log('joinGroupRes', res)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    })
}

function selectGroup(obj) {
    wx.showNavigationBarLoading()
    var data = {
        group_id: obj.data.groupId,
        user_id: app.globalData.authInfo.user_id
    }
    console.log(data)
    wx.request({
        url: app.globalData.url + 'selectgroup',
        data: data,
        method: 'POST',
        success: function (res) {
            // console.log('加群',res)

            wx.hideNavigationBarLoading()
            if (res.data.errno == 0) {
                console.log('加群成功')
                app.globalData.newGroupList = true
                wx.redirectTo({
                    url: '../group/group?group_id=' + obj.data.groupId + "&group_name=" + obj.data.groupName
                })
                try {
                    wx.removeStorageSync('grouplist')
                } catch (e) {
                    // Do something when catch error
                }
            }

            // success
            console.log('selectGroup', res)
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

function setting(obj) {
    wx.showNavigationBarLoading()
    var settingData = obj.data.settingData
    settingData.user_id = app.globalData.authInfo.user_id
    wx.request({
        url: app.globalData.url + 'setting',
        data: settingData,
        method: 'POST',
        success: function (res) {
            if (res.data.errno == 0) {
                var param = obj.data.option.param
                obj.setData({
                    loadHidden: true,
                    toastHidden: false,
                    toastText: "更新成功"
                })
                setTimeout(function () {
                    obj.setData({
                        loadHidden: true,
                        toastHidden: true
                    })
                    var serUser = app.globalData.serUser
                    serUser[param] = obj.data.settingData[param]
                    app.globalData.serUser = serUser

                    wx.setStorageSync('serUser', serUser)
                    wx.hideNavigationBarLoading()
                    wx.navigateBack({
                    })
                }, 1000)


            }

            // success
            console.log('setting', res)
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}
function searchUserData(list, inputVul) {
    var resList = []

    if (list != [] && list != '') {

        for (var i = 0; i < list.length; i++) {
            var u = list[i]['userinfo'][0]['username']
            var n = list[i]['userinfo'][0]['nickName']
            var p = list[i]['userinfo'][0]['phone']
            list[i].id = list[i]['user_id']
            list[i].name = u
            if (u != undefined && u != '') {
                if ((u.indexOf(inputVul) !== -1)) {
                    list[i].resVal = u
                    list[i].name = u
                    resList.push(list[i])
                } else if (n != undefined && n != '') {
                    if ((n.indexOf(inputVul) !== -1)) {
                        list[i].resVal = n
                        resList.push(list[i])
                    } else if (p != undefined && p != '') {
                        if ((p.indexOf(inputVul) !== -1)) {
                            list[i].resVal = p
                            resList.push(list[i])
                        }
                    }
                } else if (p != undefined && p != '') {
                    if ((p.indexOf(inputVul) !== -1)) {
                        list[i].resVal = p
                        resList.push(list[i])
                    }
                }
            }
        }
    }
    return resList
}

function searchGroupData(list, inputVul) {
    var resList = []
    if (list != [] && list != '') {

        for (var i = 0; i < list.length; i++) {
            var n = list[i]['groupinfo'][0]['group_name']
            if (n != undefined && n != '') {
                if ((n.indexOf(inputVul) !== -1)) {
                    list[i].resVal = n
                    list[i].name = n
                    list[i].id = list[i]['group_id']
                    resList.push(list[i])
                }
            }
        }
    }
    return resList
}


function getMoments(obj) {
    wx.request({
        url: app.globalData.ip + '/getMoments.php',
        data: {},
        success: function (res) {
            obj.setData({
                moments: res.data
            })
        },
        fail: function (err) {
            console.log(err);
        }
    })
}


module.exports = {
    formatTime: formatTime,

    makePhoneCall: makePhoneCall,
    addPhoneRecord: addPhoneRecord,
    getContactRecord: getContactRecord,
    getContactRecordItem: getContactRecordItem,
    getContactList: getContactList,
    getGroupList: getGroupList,
    getGroupMember: getGroupMember,
    joinGroup: joinGroup,
    selectGroup: selectGroup,
    setting: setting,
    searchUserData: searchUserData,
    searchGroupData: searchGroupData,
    getMoments: getMoments
}

