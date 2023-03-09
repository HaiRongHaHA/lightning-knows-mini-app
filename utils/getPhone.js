const getPhoneNumber = ({ params, success, fail }) => {
  const { iv, encryptedData } = params
  console.log(iv, encryptedData, " iv, encryptedData ")
  // uni.request({
  //   url: "解密手机号接口",
  //   method: "POST",
  //   dataType: "json",
  //   header: {
  //     "content-type": "application/x-www-form-urlencoded",
  //     authorization: res.data.data.token,
  //   },
  //   data: {
  //     se_key: res.data.data.session_key,
  //     iv: params.iv,
  //     encryptedData: params.encryptedData,
  //   },
  //   success: (res) => {
  //     console.log(res, "解密手机号数据")
  //     if (res.data.code == 200) {
  //       const result = {
  //         phoneNumber: String(res.data.data),
  //       }
  //       // 回调交易模版
  //       success(result)
  //     } else {
  //       uni.showToast({
  //         icon: "none",
  //         title: String(res.data.msg),
  //       })
  //     }
  //   },
  //   fail: function (e) {},
  // })
}

export default getPhoneNumber
