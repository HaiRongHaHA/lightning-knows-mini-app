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

export const wx_login =()=>{
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
					callafter()
				},
				fail:(res)=> {
					console.log(res);
				}
			});
		},
		fail:(res)=> {
			console.log(res);
		}
	});
	
}

export const callafter =()=>{
	// 数据传递到后端
	uni.request({
		url: uni.LOGIN_DY_URL,
		method:"POST",
		data: {
			code:getStorageSync('login_loginRes'),
			...getStorageSync('login_userInfo')
		},
		success: (res)=>{
			if(res.data.code == 0){
				console.log('已经登陆成功，获取token'+res.data.data.token);
				setStorageSync('login_session',res.data.data.token);
				// 当前页面刷新
				login_refresh()
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