import myajxs from '../../utils/myajxs'
Page({
  data: {
    phone:'17673841686 ',
    password:"dengks1120",
    obj:{
      name:'12212'
    }

  },
  handlePhone(event) {
  
    const phone = event.detail.value;
    this.setData({
        phone
    })
},

   handlePassword(event) {
    const password = event.detail.value;
    this.setData({
        password
    })
},
handleInput(event) {
  console.log(event)
  const value = event.detail.value;
  const {
      type
  } = event.target.dataset;
  this.setData({
      [type]: value
  })
},


async handleLogin() {
  let {
      phone,
      password
  } = this.data;

  phone = phone.trim();
  password = password.trim();

  
  if (!phone) {

      wx.showToast({
          title: "帐号不能为空",
          icon: "error"
      });

      return;
  }

  if (!password) {
      // my没用账户
      wx.showToast({
          title: "密码不能为空",
          icon: "error"
      });

      return;
  }

  const result = await myajxs('/login/cellphone', {
      phone,
      password,
      _isLogin:true
  });

  // console.log(result)

  const code = result.code;

  
  const codeFn = {
      200() {
          // 能进入这里就说明登陆成功
          wx.showToast({
              title: "登陆成功,即将跳转",
              icon: "none"
          });

      
          wx.switchTab({
              url: '/pages/personal/personal',
          })

          wx.setStorageSync('userInfo',result.profile);
          

      },
      400() {
          // 能进入这里就说明手机号格式错误
          wx.showToast({
              title: "手机号格式错误",
              icon: "error"
          });
      },
      501() {
          // 能进入这里就说明手机号不存在
          wx.showToast({
              title: "帐号不存在",
              icon: "error"
          });
      },
      502() {
          // 能进入这里就说明密码错误
          wx.showToast({
              title: "密码错误",
              icon: "error"
          });
      }
  }

  codeFn[code]&&codeFn[code]();

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