import myajxs from "../../utils/myajxs";

// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    playlist:[],
    moveDistance:0,

        moveTransition:"",

  },
  toLogin(){
    console.log('登录按钮');
      wx.navigateTo({
        url: "/pages/login/login",
      })
  },


  handleTouchStart(event){
    this.startY = event.touches[0].clientY;
    this.setData({
        moveTransition:""
    })
},

// 用于监视用户手指移动操作
handleTouchMove(event){
    const moveY = event.touches[0].clientY;
    const moveDistance = moveY - this.startY;
    if(moveDistance>0&&moveDistance<80){
        this.setData({
            moveDistance
        })
    }
},

// 用于监视用户手指抬起操作
handleTouchEnd(event){
    this.setData({
        moveDistance:0,
        moveTransition:"transform 1s"
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function() {
    // console.log();
    const userinfos  = wx.getStorageSync("userInfo")
    // console.log(userinfos);
    if(userinfos){
      // const userInfo = JSON.parse("userinfos")
      this.setData({
        userInfo:userinfos
      })
      // console.log(this.data.userInfo);

      // console.log(userinfos);
      const result = await myajxs('/user/record',{uid:userinfos.userId,type:1});
      // console.log(result,"resu");
      this.setData({
        playList:result.weekData.map((item)=>{
          return item.song.al;
        })
      })
      
    }
    // console.log('result', result)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})