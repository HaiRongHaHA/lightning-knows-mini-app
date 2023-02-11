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
	courseId:{
		type: String,
		value: "",
	}
  },
  data: {
        
  },
  methods: {
	  
    getGoodsInfo(res) {
	  // console.log(res);
	  // console.log(this.properties.courseId)
	  tt.setStorage({
	    key: "courseId",
	    data: this.properties.courseId,
	    success(res) {
	      console.log(`setStorage保存成功`);
	    },
	    fail(res) {
	      console.log(`setStorage调用失败`);
	    },
	  });
	  
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
              },
            })
          },
        })
      })
    },

    onPay(options){
	 console.log(options)
     const { status, orderId, outOrderNo, result } = options.detail
      console.log("onPay", status, orderId, outOrderNo, result)
	 // if (status === 'success') {
		  const { code } = result;
		  // 支付成功
		  if (code === 0) {
			  // const courseid = tt.getgetStorage({
				 //  key: "courseId",
				 //  success(res) {
				 //      console.log(res);
				 //    },
				 //    fail(res) {
				 //      console.log("getStorage调用失败");
				 //    },
			  // })
			  // console.log(courseid);
			  tt.switchTab({
				  url: 'usr://pages/study/study'
			  })
			  console.log('支付成功')
		  } else {
			  tt.navigateBack();
			  tt.showToast({
			    title: "支付失败", // 内容
			    icon: "none", // 图标
			  })
			  // 支付失败（超时、取消、关闭）
			 //  tt.navigateTo({
				//   url:'usr://pages/orderfail/orderfail?coupon_price=' + this.data.hbprice + '&course_id=' + this.data.kcid + '&id=' + options.detail.outOrderNo
			 //  })
			 //  tt.showToast({
				// title: "支付失败", // 内容
				// icon: "none", // 图标
			 //  });
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
      }
    },
  },
})
