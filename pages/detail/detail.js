// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    replies: [],
    hidden: false
  },
  //获取节点详情
  fetchDetail: function(id) {
    var that = this;
    wx.request({
      url: Api.getTopicInfo({
        id: id
      }),
      success: function(res) {
        console.log(res)
        res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created));
        that.setData({
          detail: res.data[0]
        })
      },
      fail:function(){
        that.setData({
          hidden: false
        })
      }
    })
    that.fetchReplies(id);
  },
  //获取回复
  fetchReplies: function(id) {
    var that = this;
    wx.request({
      url: Api.getReplies({
        topic_id: id
      }),
      success: function(res) {
        res.data.forEach(function(item) {
          item.created = Util.formatTime(Util.transLocalTime(item.created));
        })
        that.setData({
          replies: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function (options) {
    console.log("detail page load")
    this.setData({
      hidden: false
    })
    this.fetchDetail(options.id);
  }
})
