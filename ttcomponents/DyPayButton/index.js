Component({
  properties: {
    // mode: Number,
    mode: {
      type: Number,
      value: 2,
    },
    // 商品id,mode 为 2 时，该属性必传
    goodsId: {
      type: String,
      value: "",
    },
    orderId: {
      type: String,
      value: "",
    },
    courseId: {
      type: String,
      value: "",
    },
  },
  data: {},
  methods: {
    getGoodsInfo(res) {
      // console.log(res);

      // console.log(this)
      // tt.setStorage({
      //   key: "courseId",
      //   data: this.properties.courseId,
      //   success(res) {
      //     console.log(res);
      //   },
      //   fail(res) {
      //     console.log(res);
      //   },
      // });
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
          success:(loginRes)=> {
            console.log("loginRes: ", loginRes)
            tt.setStorageSync("login_loginRes", loginRes.code)
            tt.getUserInfo({
              success:(infoRes)=> {
                console.log("infoRes: ", infoRes)
                tt.setStorageSync("login_userInfo", infoRes.userInfo)
                tt.request({
                  url: 'https://api.sdknow.cn/svod-api/out/xcx/login/dy',
                  method:"POST",
                  data: {
                    code:tt.getStorageSync('login_loginRes'),
                    info:tt.getStorageSync('login_userInfo')
                  },
                  success: (res)=>{
                    if(res.data.code == 0){
                      console.log('已经登陆成功，获取token'+res.data.data.token);
                      tt.setStorageSync('login_session',res.data.data.token);
                      resolve()
                    }
                  },
                  fail:(res)=> {
                    console.log(res);
                  }
                });
              },
              fail(res) {
                console.log("fail", res)
              },
            })
          },
        })
      })
    },

    onPay(options) {
      console.log(options)
      const { status, orderId, outOrderNo, result } = options.detail
      console.log("onPay", status, orderId, outOrderNo, result)
      // if (status === 'success') {
      console.log(this)
      console.log(this.data.courseId)
      const { code } = result
      // 支付成功
      if (code === 0) {
        tt.switchTab({
          url: "user://pages/study/study",
        })

        // tt.switchTab({
        // 	url: 'usr://pages/study/study',
        // 		success(res){
        // 			console.log('success执行了', res);
        // 		},
        // 		fail(err) {
        // 		  console.log('fail执行了', err);
        // 		}
        // })
        // tt.redirectTo({
        // 		url: `chapters?course_id=${this.data.courseId}`,
        // 		success(res) {
        // 		  console.log('success执行了', res);
        // 		},
        // 		fail(err) {
        // 		  console.log('fail执行了', err);
        // 		},
        // 		complete(res) {
        // 		  console.log('complete执行了', res);
        // 		}
        // });
        console.log("支付成功")
      } else {
        tt.navigateBack()
        tt.showToast({
          title: "支付失败", // 内容
          icon: "none", // 图标
        })
      }
      // } else {
      //  const { errMsg } = result;
      // }
      // tt.navigateBack()
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
      } else if (errNo === 21506) {
        tt.showToast({
          title: "课程不存在", // 内容
          icon: "none", // 图标
        })
      }
    },
  },
})
