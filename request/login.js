export const wx_login =()=>{
	// 获取服务商供应商
	uni.getProvider({
		service: 'oauth',
		success:function(res){
			// console.log(res)
			
			// 保存登陆服务商
			if(~res.provider.indexOf('toutiao')){
				
				uni.setStorageSync('login_oauth','DY')
			}
			// console.log(uni.getStorageSync('login_oauth'))
			// uni.setStorageSync('base_oauth',res.data.data)
			
			// 小程序登陆
			uni.login({
				provider:res.provider[0],
				success:function(loginRes){
					console.log(loginRes);
					// 获取登陆信息
					uni.getUserInfo({
					  provider: res.provider[0],
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
										login_refresh()
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
		},
	})
}

export const login_refresh =()=>{
	const pages = getCurrentPages();
	const curpage = pages[pages.length-1]
	curpage.onLoad(curpage.options)
	console.log(curpage)
	console.log(curpage.options)
}