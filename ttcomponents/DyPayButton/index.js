Component({
  properties: {
    mode: Number,
    mode: {
      type: Number,
      value: 2,
    },
    goodsId: {
      type: String,
      value: "",
    },
    orderId: {
      type: String,
      value: "",
    },
  },
  data: {},

  methods: {
    getGoodsInfo() {
      return new Promise((resolve) => {
        resolve({
          minLimits: 1,
          maxLimits: 2,
          validation: {
            phoneNumber: {
              required: false, // 手机号是否必填
            },
          },
        })
      })
    },

    userLogin(event) {
      return new Promise((resolve) => {
        tt.login({
          success() {
            tt.getUserInfo({
              success(res) {
                console.log("login success", res)
                resolve()
              },
              fail(res) {
                console.log("fail", res)
                tt.openSetting({
                  success: (res) => {
                    console.log("打开设置页面成功: ", res.errMsg)
                  },
                  fail: (res) => {
                    console.log("打开设置页面失败: ", res.errMsg)
                  },
                  complete: (res) => {
                    console.log("接口已调用: ", res.errMsg)
                  },
                })
              },
            })
          },
        })
      })
    },

    onPay(options) {
      const { status, orderId, outOrderNo, result } = options.detail
      console.log("onPay", status, orderId, outOrderNo, result)
      tt.navigateBack()
    },

    handleRefund(event) {
      const { status, result } = event.detail
      if (status === "success") {
        const { refundId, outRefundNo } = result
        console.log("发起退款成功", refundId, outRefundNo)
      } else {
        const { errMsg } = result
        console.log("发起退款失败", errMsg)
      }
    },

    onError(e) {
      console.log(e.detail)
      const { errNo, errMsg } = e.detail
      console.log("errNo", errNo, "errMsg", errMsg)
      if (errNo === 21514) {
        tt.showToast({
          title: "失败", // 内容
          icon: "none", // 图标
        })
      } else if (errNo === 21513) {
        tt.showToast({
          title: "获取中", // 内容
          icon: "none", // 图标
        })
      }
    },
  },
})
