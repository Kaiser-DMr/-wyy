import PubSub  from "pubsub-js";
App({
  onLaunch(){
    // console.log(Page);
    const PageFn = Page
    Page = function(config){
      // console.log(config);
      config.$PubSub = PubSub;


      return PageFn(config);
    }

   
  },
  globalData:{
    audioId:null,
    playState:false
  }
})