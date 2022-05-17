import myajxs from "../../utils/myajxs"

// pages/recommendSong/recommendSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    recommend:[],
    month:'--',
    day:'---',
    currentIndex:null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  toSong(event){
    const {song,index} = event.currentTarget.dataset
    this.setData({
      currentIndex:index
    })
    wx.navigateTo({
      url: '/pages/song/song?songId='+song.id,

    })
  },

  onLoad:async function(options) {
    const date = new Date()
    const month = date.getMonth()+1;
    const  day = date.getDate();
    if(month!==this.data.month||day!==this.data.day){
      this.setData({
        day,
        month
      })

      const result = await myajxs ("/recommend/songs")
      // console.log(result);
      this.setData({
        recommend:result.recommend
      })
      
    }
    
    this.token = this.$PubSub.subscribe('switchType',(msg,type)=>{
      let {currentIndex , recommend} = this.data;
      console.log(recommend);
      if(type==="pre"){
          if(currentIndex===0){
            currentIndex = recommend.length-1;
          }else{
              currentIndex--;
          }
      }else{
        // console.log(recommend,"sadsdsds",currentIndex);
          if(currentIndex===recommend.length-1){
              currentIndex = 0;
          }else{
              currentIndex++;
              console.log(recommend,currentIndex,"+++++++++");
          }
      }
      // console.log(recommend[currentIndex]);
      const id = recommend[currentIndex].id;
      this.setData({
          currentIndex
      })

      // console.log('id',id)
      this.$PubSub.publish('sendId',id);
  })  
  
     
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