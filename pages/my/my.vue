<template>
	<view class="my-page">
		<view class="userInfo">
			<view class="userimgbox">
				<image class="avatar_img" v-if="infos.avatarUrl" :src="infos.avatarUrl" mode=""></image>
				<image class="avatar_img" v-else src="https://img.cdn.zhishitong.vip/s3/1364932886/Zv9LeK1.jpg" mode=""></image>
				<view  class="img-icon"  @click="updataUserInfo">
					<uni-icons type="loop" color="#636363" size="20"></uni-icons>
				</view>
			</view>
			<view class="logo-title uni-mr-5" v-if="infos.nickName">{{infos.nickName}}</view>
			<view class="logo-title uni-mr-5" v-else  @click="getUserInfos()">立即登陆</view>
		</view>
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
				console.log(uni.getStorageSync('login_userInfo'))
				//判断是否存在登陆信息
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
			// 直接更新数据
			updataUserInfo(){
				console.log("直接获取最新信息")
				wx_login();
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
				right: 20rpx;
				bottom: 10px;
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
