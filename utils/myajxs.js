export default function(url,data={},method="GET"){
  // console.log('promise发送');
  return new Promise((res,reject)=>{
    wx.request({
      url:'http://152.67.214.167:3000'+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync("token")||""
      },
      success:(ress)=>{
        // console.log(ress,'saasasa');
        if(data._isLogin){
          // console.log(11111);
          const cookies = ress.cookies
          // console.log(cookies);
          const cookie =  cookies.find((item)=>{
              return item.startsWith('MUSIC_U')
          })
          // console.log(cookie);
          wx.setStorage({
            key:'token',
            data:cookie
          })
        }
        res(ress.data)
        // console.log(ress);
       
      }
    })
  })
}