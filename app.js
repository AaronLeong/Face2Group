//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var authInfo = wx.getStorageSync('authInfo')
    var serUser = wx.getStorageSync('serUser')
    this.globalData.authInfo = authInfo
    this.globalData.serUser = serUser

  },
  onShow: function () {
    // Do something when show.
    console.log('app onShow', new Date())
  },
  onHide: function () {
    // Do something when hide.
    console.log('app onHide', new Date())
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log('getUserInfo 本地信息')
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      console.log('getUserInfo  调用登录接口')
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log('调用登录接口code', res.code)
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              console.log('getUserInfo success')

              res.userInfo.code = code
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  registerServer: function (cb) {
    console.log('registerServer')
    var _this = this
    wx.login({
      success: function (res) {
        // console.log(res.code)
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            _this.globalData.userInfo = res.userInfo
            res.code = code;
            wx.request({
              url: _this.globalData.url + 'register',
              data: res,
              method: 'POST',
              success: function (res) {
                // success

                if (res.data.errno == 0) {
                  var resUser = res.data.data
                  console.log('registerServersuccess')
                  var authInfo = {
                    user_id: resUser._id,
                    token: resUser.token
                  }
                  _this.globalData.serUser = resUser
                  wx.setStorageSync('serUser', resUser)
                  _this.globalData.authInfo = authInfo
                  wx.setStorageSync('authInfo', authInfo)
                  typeof cb == "function" && cb(resUser)
                } else {
                  console.log('registerServerfail')
                  typeof cb == "function" && cb(res)
                }

              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })
          }
        })
      }
    })
  },

  loginServer: function (cb) {
    var _this = this
    var authInfo = this.globalData.authInfo

    if (authInfo == '') {
      console.log('loginServer-authInfo为空2', authInfo)
      _this.registerServer(function (res) {
        typeof cb == "function" && cb(res)
      })

    } else {
      console.log('loginServer-authInfo不为空', authInfo)

      wx.request({
        url: this.globalData.url + 'login',
        data: this.globalData.authInfo,
        method: 'POST',
        success: function (res) {
          // success


          if (res.data.errno == 1000) {
            console.log('loginServerfail 调用registerServer')
            _this.registerServer(function (res) {
              typeof cb == "function" && cb(res)
            })
          } else {

            console.log('loginServersuccess')
            // console.log('data', res.data.data)
            
            _this.globalData.serUser = res.data.data
            wx.setStorageSync('serUser', res.data.data)
            typeof cb == "function" && cb(res)
          }
        },
        fail: function () {
          // fail
          console.log('fail')
        },
        complete: function () {
          // complete
        }
      })
    }



  },
  getLocation: function (cb) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        typeof cb == "function" && cb(res)
      }
    })
  },
  globalData: {
    userInfo: null,
    authInfo: null,
    serUser: null,
    newPhoneRecord: false,
    newContactList: false,
    newGroupList: false,
    url: "https://www.liangshihua.cn/project/minapp/",
    urlStatic: "https://www.liangshihua.cn",
    // urlStatic:"http://192.168.1.105:8661",
    // url:"http://192.168.1.105:8661/project/minapp/",
    // ip: "http://" + "192.168.1.100" + ":8360",
    // wsip: "ws://" + "192.168.1.100" + ":8360"
  }
})
