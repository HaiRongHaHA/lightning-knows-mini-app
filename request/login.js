export const getProvider =()=>{
	uni.getProvider({
		service:'oauth',
		success:function(res){
			// 保存登陆服务商
			if(~res.provider.indexOf('toutiao')){
				setStorageSync('login_oauth','DY')
			}
			console.log(getStorageSync('login_oauth'))
		}
	})
}

export const wx_login =(cb)=>{
	//判断当前服务商
	getProvider()
	
	// 小程序登陆
	uni.login({
		provider:getStorageSync('login_oauth'),
		success:function(loginRes){
			// console.log(loginRes);
			setStorageSync('login_loginRes',loginRes.code);
			// 获取登陆信息
			uni.getUserInfo({
			  provider: getStorageSync('login_oauth'),
			  success: function (infoRes){
					console.log(infoRes);
					setStorageSync('login_userInfo',infoRes.userInfo);
					callafter(cb)
				},
				fail:(res)=> {
					console.log(res);
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '获取用户信息权限失败'
					// })
					uni.showModal({
						title:"提示",
						showCancel:false,
						content: '点击【确认】，在【权限设置】页-打开【用户信息开关】-返回【我的页】点击立即登陆，即可完成更新信息',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.openSetting({
									success: (res) => {
										console.log(res);
										
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			});
		},
		fail:(res)=> {
			console.log(res);
		}
	});
	
}

export const callafter =(cb)=>{
	// 数据传递到后端
	const user = getStorageSync('login_userInfo')
	console.log(user)
	uni.request({
		url: uni.LOGIN_DY_URL,
		method:"POST",
		data: {
			code:getStorageSync('login_loginRes'),
			...user,
			nickname:user.nickName
		},
		success: (res)=>{
			if(res.data.code == 0){
				// console.log(res.data.data.user.id)
				// console.log('已经登陆成功，获取token'+res.data.data.token);
				setStorageSync('login_session',res.data.data.token);
				setStorageSync('login_userid',res.data.data.user.id);
				if(cb){
					cb()
				} else {
					login_refresh()
				}
			}
		},
		fail:(res)=> {
			console.log(res);
		}
	});
}

export const login_refresh =()=>{
	const pages = getCurrentPages();
	const curpage = pages[pages.length-1];
	// console.log(curpage)
	curpage.onLoad(curpage.options)
	if(curpage.onShow){
		curpage.onShow()
	}
	
	// curpage.onReady()
	// console.log(curpage.options)
}

export const setStorageSync =(tokenKey,token)=>{
	return uni.setStorageSync(tokenKey,token);
}

export const getStorageSync =(tokenKey)=>{
	return uni.getStorageSync(tokenKey)
}