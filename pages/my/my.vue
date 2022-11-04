<template>
	<view class="my-page">
		<!-- <uni-sign-in ref="signIn"></uni-sign-in> -->
		<!-- <view class="userInfo" @click.capture="toUserInfo">
			<cloud-image width="150rpx" height="150rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image>
			<image v-else class="logo-img" src="https://img.cdn.zhishitong.vip/s3/1364932886/Zv9LeK1.jpg"></image>
			<view class="logo-title">
				<text class="uer-name" v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
				<text class="uer-name" v-else>{{$t('mine.notLogged')}}</text>
			</view>
		</view>  uni-my-15-->
		<view class="userInfo" @click="getUserInfos()">
			<view class="userimgbox">
				<image class="avatar_img" v-if="infos.avatarUrl" :src="infos.avatarUrl" mode=""></image>
				<image class="avatar_img" v-else src="https://img.cdn.zhishitong.vip/s3/1364932886/Zv9LeK1.jpg" mode=""></image>
				
			</view>
			<view class="logo-title uni-mr-5" v-if="infos.nickName">{{infos.nickName}}</view>
			<view class="logo-title uni-mr-5" v-else>{{infos.nickName}}立即登陆</view>
			<view :class="[rotate?'go':'aa']"  @click="start">
				<uni-icons class="img-icon" type="loop" size="30"></uni-icons>
			</view>
		</view>
		<!-- <view class="user-icon-list uni-my-5">
			<view class="user-icon-list-item">
				<image class="user-item-img" src="https://img.cdn.zhishitong.vip/s3/1364932886/JoJe6LM.png" mode=""></image>
				<text class="user-item-text">订单</text>
			</view>
			<view class="user-icon-list-item">
				<image class="user-item-img" src="https://img.cdn.zhishitong.vip/s3/1364932886/JoJe6LM.png" mode=""></image>
				<text class="user-item-text">收藏</text>
			</view>
			<view class="user-icon-list-item">
				<image class="user-item-img" src="https://img.cdn.zhishitong.vip/s3/1364932886/JoJe6LM.png" mode=""></image>
				<text class="user-item-text">消息</text>
			</view>
		</view> -->
		<view class="user-list">
			<view class="list-item" @click="teacherapply()">
				<view class="item-title">立即入驻</view>
				<view class="item-right">></view>
			</view>
			<view class="list-item">
				<view class="item-title">服务协议</view>
				<view class="item-right">></view>
			</view>
			<view class="list-item">
				<view class="item-title">隐私政策</view>
				<view class="item-right">></view>
			</view>
			<view class="list-item" @click="question()">
				<view class="item-title">常见问题</view>
				<view class="item-right">></view>
			</view>
		</view>
		<!-- 申请入驻 -->
		<!-- <view class="img_box  uni-my-5" @click="teacherapply">
			<image src="https://img.cdn.zhishitong.vip/s3/1364932886/Zv9LeK1.jpg" mode=""></image>
		</view> -->
		
		<!-- 列表 start -->
		<!-- <uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index" :border="false">
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{type:item.icon,color:'#999'}">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list> -->
		
	</view>
</template>

<script>
	
	import {wx_login} from '@/request/login'
	
	export default{
		data(){
			return {
				infos:[],
				rotate:false
			}
		},
		onLoad(){
			
			// uni.showToast({
			// 	title: `网页吊起支付`,
			// 	icon: 'none'
			// })
			this.getUserInfos()
			// console.log(this.infos)
		},
		methods: {
			start(){
				this.rotate=!this.rotate;
				console.log(this.rotate)
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			teacherapply(){
				uni.navigateTo({
					url: '/pages/apply/apply'
				})
			},
			question(){
				uni.navigateTo({
					url: '/pages/my/question'
				})
			},
			getUserInfo(){
				// console.log(this)
				const that = this
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						// 判断登陆的服务商
						// console.log(res.provider)
						uni.showToast({
							title: res.provider+"登陆",
							duration: 2000
						});
						
						// 判断抖音登陆
						if (~res.provider.indexOf('toutiao')) {
							// 抖音登录 获取抖音的code
							uni.login({
							  provider: res.provider,//这里服务商名是字节跳动小程序 所以填toutiao
							  success: function (loginRes) {
								  
									// 获取用户信息。
									uni.getUserInfo({
										  provider: res.provider,
										  success: function (infoRes) {
											// 获取抖音用户登陆信息
											// 本地数据调用
											that.infos = infoRes.userInfo
											
											// console.log(loginRes.code);
											// 传递code到后端
											uni.request({
											    url: uni.LOGIN_DY_URL,
												method:"POST",
											    data: {
											        code:loginRes.code,
													info:infoRes.userInfo
											    },
											    success: (res) => {
											        console.log(res);
													uni.setStorageSync('login_session',res.data.data)
											    }
											});
											
											// 将用户登陆信息保存到本地
											uni.setStorage({
												key: 'storage_key',
												data: infoRes.userInfo,
												success: function () {
													// console.log('本地存储成功：success');
												}
											});
											
											// console.log(that.infos)
										  }
									});
									
								}
							});
						}
					}
				});
			},
			getUserInfos(){
				console.log(uni.getStorageSync('login_userInfo'))
				if(uni.getStorageSync('login_userInfo')){
					this.infos = uni.getStorageSync('login_userInfo')
				}else{
					wx_login();
				}
			},
			historyorder(){
				uni.navigateTo({
					url: '/pages/my/historyorder'
				})
			},
			updataUserInfo(){
				console.log(111)
			}
		}
	}
</script>

<style lang="scss">
	.aa{
		transition: all 2s;
		
	}
	.go{
		transform: rotate(-180deg);
		transition: all 2s;
	}
	.my-page{
		min-height: 50vh;
		padding: 0 20rpx 30rpx;
		// background: linear-gradient(180deg,#eef4fc,#f5f6f9);
		// background-color: #f4f4f4;
		box-sizing: border-box;
	}
	.userimgbox{
		    position: relative;
			.img-icon{
				position: absolute;
				right: 10rpx;
				bottom: 0px;
			}
	}
	
	// 登陆信息页
	.userInfo{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 50rpx 0 70rpx 0;
		.logo-title{
			font-weight: 500;
			color: #333;
			font-size: 40rpx;
		}
	}
	.userInfo image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 3rpx solid #fff;
		margin-right: 30rpx;
		image{
			width: 100%;
			height: 100%;
		}
		img{
			width: 100%;
			height: 100%;
			border-radius: 20px;
		}
		.avatar_img{
			border-radius: 50%;
			width: 30rpx;
			height: 30rpx;
			overflow: hidden;
			border: 3rpx solid #fff;
		}
		
	}
	// 列表页面
	.list-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 28rpx;
		// padding-top: 25rpx;
		margin-bottom: 24rpx;
		border-radius: 24rpx;
		font-size: 28rpx;
		color: #636363;
		.item-right{
			color: #999;
		}
	}
	// 立即入驻图片
	.img_box image{
		width: 100%;
		height: 208rpx;
		border-radius: 20px;
		image,img{
			width: 100%;
			height: 100%;
			border-radius: 20px;
		}
	}
	
	
</style>
