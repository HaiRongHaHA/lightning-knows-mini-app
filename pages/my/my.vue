<template>
	<view class="my-page">
		<view class="userInfo">
			<view class="userimgbox">
				<image class="avatar_img" v-if="infos.avatarUrl" :src="infos.avatarUrl" mode="aspectFill"></image>
				<image class="avatar_img" v-else src="https://p9-passport.byteacctimg.com/img/mosaic-legacy/3795/3047680722~300x300.image" mode="aspectFill"></image>
			</view>
			<view class="user-right">
				<view class="user-top">
					<view class="logo-title uni-mr-5" v-if="infos.nickName">{{infos.nickName}}</view>
					<image class="img-update" v-if="infos.nickName" src="../../static/icon/undate.png" @click="updataUserInfo"></image>
					<view class="logo-title uni-mr-5" v-else  @click="getUserInfos()">立即登陆</view>
				</view>
				<view class="user-bottom" v-if="userid"><text>学号：{{userid}}</text> <button @click="paste">复制学号</button> </view>
				<!-- <view class="user-bottom">学号：<text @click="paste">{{userid}}</text></view> -->
			</view>
		</view>
		
		<view class="user-list">
			<view class="list-item" @click="teacherapply()">
				<view class="item-title">立即入驻</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view>
			<view class="list-item" @click="historyorder()">
				<view class="item-title">我的订单</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view>
			<button open-type="contact">
				<view class="list-item" style="margin-bottom: 0;">
						<view class="item-title">咨询反馈</view>
						<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
				</view>
			</button>
			<!-- <view class="list-item">
				<view class="item-title">服务协议</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view>
			<view class="list-item">
				<view class="item-title">隐私政策</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view> -->
			<view class="list-item" @click="question()">
				<view class="item-title">常见问题</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view>
			<!-- <view class="list-item">
				<view class="item-title">关于课堂</view>
				<view class="item-right"><image src="../../static/icon/right.png" mode=""></image></view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	
	import { setStorageSync,getStorageSync,wx_login } from '@/request/login.js'
	export default{
		data(){
			return {
				infos:[],
				userid:'',
				rotate:false
			}
		},
		onLoad(){
			
			// uni.showToast({
			// 	title: `网页吊起支付`,
			// 	icon: 'none'
			// })
			// this.getUserInfos()
			// console.log(this.infos)
		},
		onShow() {
			// 每次打开页面都请求刷新数据
			// 判断是否登陆过，登陆过就获取详细信息
			// if(uni.getStorageSync('login_session')){
				this.getUserInfos()
			// }
			
		},
		methods: {
			// start(){
			// 	this.rotate=!this.rotate;
			// 	console.log(this.rotate)
			// },
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
			//获取用户信息
			getUserInfos(){
				//判断是否存在登陆信息
				if(getStorageSync('login_userInfo')){
					this.infos = getStorageSync('login_userInfo')
					console.log(this.userid = getStorageSync('login_userid'))
				}else{
					wx_login();
				}
			},
			historyorder(){
				uni.navigateTo({
					url: '/pages/my/historyorder'
				})
			},
			// 直接更新数据
			updataUserInfo(){
				console.log("直接获取最新信息")
				wx_login();
			},
			//paste
			paste(){
				if(this.userid){
					uni.setClipboardData({
						data: this.userid,
						success: function () {
							uni.showToast({
								icon: 'success',
								title: '复制学号成功'
							});
						}
					});
				}
				
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
		padding: 0 30rpx 30rpx;
		// background: linear-gradient(180deg,#eef4fc,#f5f6f9);
		// background-color: #f4f4f4;
		box-sizing: border-box;
	}
	// .userimgbox{
	// 	    position: relative;
	// 		
	// }
	
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
		.userimgbox .avatar_img{
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #fff;
			margin-right: 15px;
		}
		.img-update{
			width: 40rpx;
			height:40rpx
		}
		
		.user-right{
			display: flex;
			flex-direction: column;
			
			.user-top{
				display: flex;
				align-items: center;
			}
			.user-bottom{
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #777474;
				margin-top: 10px;
				button{
					font-size: 12px;
					padding: 4px 8px;
					border-radius:20px;
					background-color: transparent;
					border: 1px solid #3c95ff;
					color: #3c95ff;
					margin: 0;
					margin-left: 16px;
				}
			}
		}
		
	}
	// .userInfo image{
	// 	width: 120rpx;
	// 	height: 120rpx;
	// 	border-radius: 50%;
	// 	overflow: hidden;
	// 	border: 3rpx solid #fff;
	// 	margin-right: 30rpx;
	// 	image{
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// 	img{
	// 		width: 100%;
	// 		height: 100%;
	// 		border-radius: 20px;
	// 	}
	// }
		// .avatar_img{
		// 	border-radius: 50%;
		// 	width: 30rpx;
		// 	height: 30rpx;
		// 	overflow: hidden;
		// 	border: 3rpx solid #fff;
		// }
		
	
	// 列表页面
	.list-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 30rpx 20rpx;
		// padding-top: 25rpx;
		margin-bottom: 24rpx;
		border-radius: 24rpx;
		font-size: 28rpx;
		color: #636363;
		.item-right{
			color: #999;
			image{
				width: 20rpx;
				height: 20rpx;
			}
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
	
	
	// 默认样式
	button {
		position:relative;
		display:block;
		margin-left:auto;
		margin-right:auto;
		padding-left:0;
		padding-right:0;
		box-sizing:border-box;
		font-size:28rpx;
		text-align:center;
		text-decoration:none;
		line-height:1;
		border-radius:24rpx;
		-webkit-tap-highlight-color:transparent;
		overflow:hidden;
		color:#000000;
		background-color:#fff;
		margin-bottom: 24rpx;
	}
	// 边框样式
	button::after{
		  border: 0;
		  border: none;
	}
	// 禁用时样式
	button[disabled] {
		  background-color: #fff;
		  color: #666;
	}
	// 点击时样式
	.button-hover {
		color:rgba(0, 0, 0, 0.6);
		background-color:#fff;
	}
	
</style>
