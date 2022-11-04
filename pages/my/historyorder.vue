<template>
	<view>
		<view class="blank">
			<view class="empty"><view class="empty_box"><image class="empty_img" src="https://m.zhishitong.vip/static/img/wushuju.e16c3059.png" mode=""></image></view><view class="empty_text">没有要学习的课程</view></view>
			<button class="home">去首页逛逛</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.blank{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-75%);
	transform: translate(-50%,-75%);
	.empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		.empty_img{
		    width: 356rpx;
		    height: 340rpx;
			.empty_img image{
			    width: 100%;
			    height: 100%;
			}
			img{
				width: 100%;
				height: 100%;
			}
		}
		.empty_text{
			font-size: 32rpx;
			font-weight: 500;
			color: #a5a5a5;
			opacity: .7;
		}
	}
	.home{
		margin-top: 30rpx;
		background: #007aff;
		color: #fff;
		border-radius: 100rpx;
		font-size: 24rpx;
	}
}
</style>
