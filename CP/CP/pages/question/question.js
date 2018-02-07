var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选项
    A: "",
    B: "",
    C: "",
    D: "",
    testnum: 1,
    description:"",
    result:[],
    screenWidth: ''
  },
  //页尾跳转
  goAbout: function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  //点击选项
  clickA: function () {
    var temp = this.data.result;
    temp.push('A')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickB: function () {
    var temp = this.data.result;
    temp.push('B')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickC: function () {
    var temp = this.data.result;
    temp.push('C')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  clickD: function () {
    var temp = this.data.result;
    temp.push('D')
    this.setData({
      result: temp
    })
    console.log(this.data.result)
  },
  gonext: function() {
    //完成
    if(this.data.testnum>5){
      var that = this;
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/testResult',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          array: that.data.result
        },
        method:'POST',
        success: function (res) {
          console.log(res)
          var id = '../rate/rate?id='+res.data['data'][0]['id'];
          console.log(id)
          wx.redirectTo({
            url: id,
          })
        }
      })
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/cpResult',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method:'POST',
        data:{
          array: that.data.result
        },
        success: function (res) {
          wx.setStorageSync('cptype', res.data[0].id)
          wx.setStorageSync('cp', res.data[0])
          console.log(res)
          console.log(res.data[0].id)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    else{
      var num = this.data.testnum+1;
      this.setData({
        testnum: num
      })
      this.showing();
    }
  },
  //获取题目数据
  showing: function () {
    var that = this;
    wx.request({
      url: 'https://api.gentleleetommy.cn/bestcp/questions',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var result = res.data['data'][that.data.testnum - 1];

        that.setData({
          description: result['description'],
          A: result['A'],
          B: result['B'],
          C: result['C'],
          D: result['D'],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        screenWidth: wx.getSystemInfoSync().windowWidth
      })
      console.log(this.data.screenWidth)
     

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
    this.showing();
    
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