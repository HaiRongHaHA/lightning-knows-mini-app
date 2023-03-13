const getPhoneNumber = ({ params, success, fail }) => {
  uni.request({
    url: uni.DECRYPT,
    method: "GET",
    header: {
      token: uni.getStorageSync("login_session"), //获取登陆信息
      channel: uni.getStorageSync("login_oauth"),
    },
    data: {
      iv: params.iv,
      data: params.encryptedData,
    },
    success: (res) => {
      const { code, msg, data } = res.data
      try {
        const { phoneNumber } = JSON.parse(data)
        if (code === 0) {
          const result = {
            phoneNumber: String(phoneNumber || ""),
          }
          success(result)
        } else {
          uni.showToast({
            icon: "none",
            title: msg,
          })
        }
      } catch {}
    },
    fail: function (e) {},
  })
}

export default getPhoneNumber
