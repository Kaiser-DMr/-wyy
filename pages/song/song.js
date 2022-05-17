import myajxs from "../../utils/myajxs"
const appInstance = getApp();
// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    isPlay:false,
    musicUrl:null,
    songId:null
  },

  async getMusicDetail(){
    // console.log(111);
    const result =await myajxs('/song/detail',{ids:this.data.songId});
    // console.log(result);
    this.setData({
      songObj :result.songs[0]

    })
    wx.setNavigationBarTitle({
      title: this.data.songObj.name,

    })
  },
  async getMusicUrl(){
    const result2= await myajxs("/song/url",{
      id:this.data.songId
    })
    // console.log(result2);
    this.setData({
      musicUrl:result2.data[0].url
    })
  },
  switchType(event){
    const type = event.currentTarget.id
    this.$PubSub.publish('switchType',type)
  },
  async handlePlay(){
    if(this.data.isPlay){
      this.backgroundAudioManager.pause()
      appInstance.globalData.playState = false;

    }else{
      if(!this.data.musicUrl){
        await this.getMusicUrl()
      }
      console.log(this.data.musicUrl);
      this.backgroundAudioManager.src = this.data.musicUrl;
            this.backgroundAudioManager.title = this.data.songObj.name;

            appInstance.globalData.audioId = this.data.songObj.id;
            appInstance.globalData.playState = true;
    }
    this.setData({
      isPlay: !this.data.isPlay
    
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const songId = options.songId*1
    this.setData({
      songId
    })
    this.getMusicDetail()


    const { audioID,playState } = appInstance.globalData

    if(playState && audioId === songId){
      this.setData({
        isPlay:true
      })
    }

    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    this.token = this.$PubSub.subscribe('sendId', (msg, songId) => {
        // console.log('sendId', msg, songId)

        this.setData({
            songId
        });

        const promise1 = this.getMusicDetail();

        const promise2 = this.getMusicUrl();

        Promise.all([promise1,promise2])
        .then(()=>{
            this.backgroundAudioManager.src = this.data.musicUrl;
            this.backgroundAudioManager.title = this.data.songObj.name;

        appInstance.globalData.audioId = this.data.songObj.id;

        appInstance.globalData.playState = true;

            this.setData({
                isPlay:true
            })
        })

        
    })
  },


  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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