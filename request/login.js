export const getProvider =()=>{
	uni.getProvider({
		service:'oauth',
		success:function(res){
			// 保存登陆服务商
			if(~res.provider.indexOf('toutiao')){
				uni.setStorageSync('login_oauth','DY')
			}
			console.log(uni.getStorageSync('login_oauth'))
		}
	})
}

export const wx_login =()=>{
	//判断当前服务商
	getProvider()
	// 小程序登陆
	uni.login({
		provider:uni.getStorageSync('login_oauth'),
		success:function(loginRes){
			console.log(loginRes);
			// 获取登陆信息
			uni.getUserInfo({
			  provider: uni.getStorageSync('login_oauth'),
			  success: function (infoRes){
					console.log(infoRes);
					uni.setStorageSync('login_userInfo',infoRes.userInfo);
					// 数据传递到后端
					uni.request({
						url: uni.LOGIN_DY_URL,
						method:"POST",
						data: {
							code:loginRes.code,
							info:infoRes.userInfo
						},
						success: (res)=>{
							if(res.data.code == 0){
								console.log('已经登陆成功，获取token'+res.data.data.token);
								uni.setStorageSync('login_session',res.data.data.token);
								// login_refresh()
							}
							
							//重新调用index首页的onload
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
		},
		fail:(res)=> {
			console.log(res);
		}
	})
	
}

export const login_refresh =()=>{
	const pages = getCurrentPages();
	const curpage = pages[pages.length-1]
	curpage.onLoad(curpage.options)
	curpage.onShow()
	// curpage.onReady()
	console.log(curpage)
	// console.log(curpage.options)
}