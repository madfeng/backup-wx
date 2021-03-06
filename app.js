var ga = require("/utils/ga.js");
var GoogleAnalytics = ga.GoogleAnalytics;
//app.js
App({
  tracker: null,
  getTracker: function () {
    if (!this.tracker) {
      // 初始化GoogleAnalytics Tracker
      this.tracker = GoogleAnalytics.getInstance(this)
        .setAppName('乡居网别墅排屋')
        .setAppVersion('1.0.0')
        .newTracker('UA-90097818-3'); //用你的 Tracking ID 代替
    }
    return this.tracker;
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    siteUrl: 'https://91xiangju.com'
    // siteUrl: 'http://www.junchao.test.91xiangju.com'
  },

  /**
   * 根据对象形成 Query 字符串 '?k=v&k2=v2'
   */
  parseQueryString: function ($data) {
    var $string = '';
    var $prop;

    for ($prop in $data) {
      if ($data.hasOwnProperty($prop)) {
        if (!$string)
          $string += '?';
        else
          $string += '&';

        $string += $prop + '=' + $data[$prop];
      }
    }

    return $string;
  }
})