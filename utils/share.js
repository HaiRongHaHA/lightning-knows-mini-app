const share = ()=>{
  uni.showShareMenu({
    menus: ["share", "record"],
    success(res) {
      console.log("已成功显示转发按钮", res);
    },
    fail(err) {
      console.log("showShareMenu 调用失败", err.errMsg);
    },
    complete(res) {
      console.log("showShareMenu 调用完成", res);
    },
  });
}

export default share