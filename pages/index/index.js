// pages/index/index.js
import myajxs from '../../utils/myajxs'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      lunboimgs:[],
      recommend_roll:[],
      Musicrecommend:[]
  },

  gotuijian(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
      // wx.request({
      //   url: 'http://localhost:3000/banner',
      //   data:{
      //     type:2
      //   },
      //   success:(res)=>{
      //     // console.log(res);
      //     this.setData({
      //       lunboimgs:res.data.banners
      //     })
      //   }
      // })
      // wx.request({
      //   url: 'http://localhost:3000/personalized',
      //   data:{

      //   },
      //   success:(box)=>{
      //     // console.log(box);
      //     this.setData({
      //       recommend_roll:box.data.result
      //     })
      //     // console.log(recommend_roll);
      //   }
      // })
      // console.log('发送亲求');
        const mydata= await myajxs('/banner',{type:2},"GET");
         this.setData({
          lunboimgs:mydata.banners
         })
         const mydata2= await myajxs('/personalized',{},"GET");
          this.setData({
            recommend_roll:mydata2.result
          })

          console.log('排行榜');
          let arr=[1,3,5,7,9]
          let arrindex = 0 
          let Musicrecommend= []
        for(let arrindex = 0;arrindex<arr.length;arrindex++){
          // console.log(arrindex);
          const mydata3 = await myajxs('/top/list',{idx:arr[arrindex]},"GET");
          // console.log(mydata3);
          let msobj={
            id :mydata3.playlist.id ,
            name : mydata3.playlist.name,
            museinfo:{
              museinfo:  mydata3.playlist.tracks.slice(0,3).map((item)=>{
                  let {id,name,picUrl} =item.al
                  return {
                    id,
                    name,
                    picUrl
                  }
                })
            }
          }
          Musicrecommend.push(msobj);
            this.setData({
              Musicrecommend
            })
         
          }
          

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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