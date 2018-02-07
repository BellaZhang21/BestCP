// pages/result/result.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    cpInfo:{
      avatarUrl:""
    },
    bestCP:"      ",
    description:"",
    status:"fail"
  },
  aa: function(){
    wx.previewImage({
      urls: ['http://bellazhang.cn/PNG/qrcode.jpg']
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })  
  },
  goAbout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  // 转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '寻找最佳CP',
      path: '/pages/index/index',
      imageUrl: '/pages/cover.jpeg',
      success: function (res) {
        // 转发成功
        console.log('success')
      },
      fail: function (res) {
        // 转发失败
        console.log('fail')
      }
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
    console.info(this.userInfo.avatarUrl)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    var info = {};
    info.nickName = wx.getStorageSync('mynickName');
    info.avatarUrl = wx.getStorageSync('myavatarUrl');
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      console.log(this.data.userInfo)
    
    var that = this;
    // 情景值
    if(ops.scene == 1044){
      console.log("ops.scene = " + ops.scene);
      var shareTicket = ops.shareTicket;
      wx.getShareInfo({
        shareTicket: shareTicket,
        success: function (res) {
          var that = this;
          console.log("type = " + cptype);
          var encryptedData = res.encryptedData;
          var iv = res.iv;
          // 分享
          wx.request({
            url: 'https://api.gentleleetommy.cn/bestcp/onShare',
            data: {
              wx_id: wx.getStorageSync('wx_id'),
              encryptedData: encryptedData,
              cptype: cptype,
              sessionKey: wx.getStorageSync('sessionKey'),
              iv: iv
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data.group_id)
              wx.setStorageSync('group_id', res.data.group_id)
              wx.navigateTo({
                url: '../result/result',
              })
            }
          })
        }
      })
    }
    // 获取最佳CP头像昵称类型
    else{
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/bestcouple',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          wx_id: wx.getStorageSync('wx_id'),
          group_id: wx.getStorageSync('group_id')
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          if (res.data!="" && res.statusCode == 200) {
            var info = {};
            info.avatarUrl = res.data.avatarUrl;
            info.nickname = res.data.nickname;
            var cp = wx.getStorageSync('cp')
            that.setData({
              cpInfo: info,
              bestCP: cp.type,
              description: cp.description,
              status: "success"
            })
          }
          else {
            console.log('fail')
            var info = {};
            info.nickname = "";
            info.avatarUrl = 'http://bellazhang.cn/PNG/question-icon.png';
            that.setData({
              cpInfo: info,
              bestCP: "none",
              description: '您的好友还没有测试完哦~稍后再来查看结果吧~'
            })
            console.log(that.data.cpInfo.avatarUrl)
          }
        },
        
      })
    }
    // 判断转发

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})