const update = () => {
  try {
    console.log('更新版本');
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log("请求完新版本信息的回调", res)
    })
    updateManager.onUpdateReady((res) => {
      console.log('新版本已经准备好');
      uni.showModal({
				showCancel:false,
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    })
    updateManager.onUpdateFailed((res) => {
      console.log("新的版本下载失败", res)
    })
  } catch (error) {
    console.log(`getUpdateManager fail: ${JSON.stringify(error)}`)
  }
}
export default update
