var app = getApp()
var util = require('../../utils/util')
Page({
  data: {
    number:[
            ['number-null',],
            ['number-null',],
            ['number-null',],
            ['number-null',]],
    focus: false,
    code: null,
    disabled: false,
    loading: false,
    groupId:null,
    groupName:'群聊',
    memberList:[],
    memberListHidden:true,
    selectHidden:true
  },
  selectGroup:function(){
    this.setData({
      loading: !this.data.loading,
      disabled: !this.data.disabled
    })
    util.selectGroup(this)
  },
  bindKeyInput: function (e) {
    var itemLen;
    var val =e.detail.value
    var valArr= val.split('')
    console.log('valArr',valArr)
    switch (e.detail.value.length){
       case 0:
          itemLen=[
            ['number-null',],
            ['number-null',],
            ['number-null',],
            ['number-null',]]
          break;
      case 1:
          itemLen=[
            ['number',valArr[0]],
            ['number-null',],
            ['number-null',],
            ['number-null',]]
          break;
      case 2:
         itemLen=[
            ['number',valArr[0]],
            ['number',valArr[1]],
            ['number-null',],
            ['number-null',]]
          break;
      case 3:
          itemLen=[
            ['number',valArr[0]],
            ['number',valArr[1]],
            ['number',valArr[2]],
            ['number-null',]]
          break;
      case 4:
          itemLen=[
            ['number',valArr[0]],
            ['number',valArr[1]],
            ['number',valArr[2]],
            ['number',valArr[3]]]
          break;
    }
    this.setData({
      code : e.detail.value,
      number : itemLen
    })
    console.log(e)
    console.log('e.detail.value',e.detail.value)
    if (e.detail.value.length ==4) {
      // 收起键盘
      wx.hideKeyboard()
      console.log('value',e.detail.value)
      util.joinGroup(this)
    }

  }
})
