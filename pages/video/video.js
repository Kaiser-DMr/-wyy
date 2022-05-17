import myajxs from "../../utils/myajxs"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:null,
    videolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("getVideoList");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
      // console.log(222);
      const resuest = await myajxs('/video/group/list')
      // console.log(resuest,"--------resuest");
      this.setData({
        currentId:resuest.data[0].id,
        navList:resuest.data
      })

      // console.log(this.data.currentId);
      const videolist  = await myajxs('/video/group',{id:this.data.currentId})
      // console.log(videolist);
      this.setData({
        videolist: videolist.datas.map((item) => {
          return item.data;
      })
      })
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