<template>
	<view>
		<view class="container">
			<view class="card-box">
				<view class="card-header">
					<image class="header-avatar" :src="info.userimg" mode=""></image>
					<view class="header-content">{{info.nickname}}</view>
				</view>
				<view class="card-content">
					<view class="item-header"><image class="item-avatar" :src="info.banner" mode=""></image></view>
					<view class="item-content">
						<view class="item-content-title">{{info.title}}</view>
						<view class="item-content-coursenumb">共{{info.chapter}}节课</view>
						<view class="item-content-doc">购买后永久有效｜7天未学可退</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="item-price"><view class="item-price-cont">购买份数</view><view class="item-price-numb">1份</view></view>
					<view class="item-subtotal uni-mt-10">小计 ¥ {{toFixed(info.price)}}</view>
				</view>
			</view>
			<view class="card-box">
				<view class="card-header getnubmer">
					<view class="header-content">联系方式（选填）</view>
					<!-- <view class="header-note" @click="getPhone()">一键填写</view> -->
				</view>
				<view class="card-content" style="padding-top: 0;">
					<input class="phoneout" type="number" placeholder="输入手机号仅用于商家确认">
				</view>
			</view>
			<view class="card-box buy-tips" @click="buytips()">
				<view class="buy-tips-title">
					购买需知
				</view>
				<view class="buy-tips-right">></view>
			</view>
			<!-- 底部提交订单按钮 -->
			<view class="good-carts">
				<view class="good-box">
					<view class="good-money">¥ {{toFixed(info.price)}}</view>
					<view class="good-submit" @click="goodsubmit()">提交订单</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {toFixed} from '@/utils/utils'
	export default {
		data() {
			return {
				//课程详情
				info:[],
				authInfo:[],
				//课程id
				courseid:''
			}
		},
		onLoad(e) {
			// 获取当前的课程id
			console.log(e);
			this.courseid = e.courseid
			this.info = JSON.parse(e.detail)
			console.log(this.info);
		},
		methods: {
			toFixed,
			//跳转购买须知
			buytips(){
				uni.navigateTo({
					url:`/pages/pay/notes`
				});
			},
			//购买成功查看课程
			buycourse(){
				uni.navigateTo({
					url:`/pages/chapters/chapters?courseid=${this.courseid}`
				});
			},
			// 获取用户手机号
			getPhone(){
				uni.showToast({
					title: `正在获取手机号`,
					icon: 'none'
				})
			},
			
			// 提交订单
			goodsubmit(){
				const that =this;
				// 向后端请求支付下单
				uni.request({
					url: uni.DY_PAY,
					method:'POST',
					header: {
						'token': uni.getStorageSync('login_session') ,//自定义请求头信息
						'channel':uni.getStorageSync('login_oauth')
					},
					data:{
						courseId: that.courseid
					},
					success:(res) =>{
						if(res.code == 4500){
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
						console.log(res.data);
						
						const orderinfo = res.data.data
						//判断是否存在
						if(res.data){
							// 前端调起支付窗口
							uni.requestPayment({
								provider:'toutiao',
								orderInfo: {
									order_id: orderinfo.outOrderId,
									order_token:orderinfo.orderToken,
								}, 
								service:5,
								success: function (res) {
									console.log('success:' + JSON.stringify(res));
									that.getpayinfo(orderinfo.orderNo)
								},
								fail: function (err) {
									console.log('fail:' + JSON.stringify(err));
								},
								getOrderStatus:function(res){
									console.log(res);
								}
								// complete:function(res){
								// 	console.log(res)
								// }
							})
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			},
		
			// 获取订单状态
			getpayinfo(orderNo){
				uni.request({
					url: uni.HOSTS_URL+'/svod-api​/out​/xcx​/order​/get​/payinfo',
					method:'GET',
					header: {
						'token': uni.getStorageSync('login_session'), //获取登陆信息
						'channel':uni.getStorageSync('login_oauth')
					},
					data:{
						orderNo:orderNo
					},
					success(res) {
						console.log(res)
					},
					fail:(res)=> {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
		.container{
			font-size: 26rpx;
		}
		// 底部
		.good-carts {
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
			.good-box{
				display: flex;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				.good-money{
					width: 50%;
					font-size: 40rpx;
					color: red;
					font-weight: 900;
				}
				.good-submit{
					width: 50%;
					background-color: red;
					color: #fff;
				}
			}
		}
		.buy-tips{
			display: flex;
			justify-content: space-between;
			.buy-tips-right{
				color: #636363;
			}
		}
		// 卡片
		.card-box{
			border-radius: 8rpx;
			background-color: #fff;
			margin: 20rpx;
			padding: 20rpx;
			.getnubmer{
				justify-content: space-between;
			}
			
			// 卡片头部
			.card-header{
				display: flex;
				border-bottom: 1px #EBEEF5 solid;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
				padding-bottom: 20rpx;
				.header-avatar{
					width: 80rpx;
					height: 80rpx;
					overflow: hidden;
					border-radius: 10rpx;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			// 卡片中间
			.card-content{
				// padding: 10px;
				display: flex;
				flex-direction: row;
				padding-top: 20rpx;
				flex: 1;
				overflow: hidden;
				.phoneout{
					width: 100%;
					padding-top: 10px;
					font-size: 28rpx;
				}
				.item-header{
					margin-right: 20rpx;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					display: flex;
					height: 160rpx;
					width: 160rpx;
					
					image{
						width: 100%;
						height: 100%;
					}
				}
				.item-content{
					flex-direction: column;
					justify-content: space-between;
					display: flex;
					.item-content-coursenumb,.item-content-doc{
						font-size: 24rpx;
						color: #636363;
					}
				}
			}
			// 卡片底部
			.card-footer{
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;
				padding-bottom: 0;
				.item-price{
					justify-content: space-between;
					display: flex;
				}
				.item-subtotal{
					display: flex;
					flex-direction: row-reverse;
					font-size: 32rpx;
				}
			}
			
		}
</style>
