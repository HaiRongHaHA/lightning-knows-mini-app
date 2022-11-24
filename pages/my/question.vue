<template>
	<view>
		<uni-collapse accordion>
			<uni-collapse-item title="如何反馈您遇到的问题？">
				<view class="content">
					<text class="text">
						您可以点击页面右上角反馈按钮，麻烦请仔细描述您的问题，附上图片更有助于平台定位问题。
						
						您可以在抖音app-我的-设置-反馈与帮助页面，点击右上角反馈历史查看到平台给您的反馈信息。
					</text>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="退款说明">
				<view class="content">
					<text class="text">
						自您购买课程7天内，若学习累计时长未超过10分支可申请退款，超过10分钟（包含10分钟）则不可退款
					</text>
				</view>
				
			</uni-collapse-item>
			<uni-collapse-item title="购买后如何学习课程？">
				<view class="content">
					<text class="text">
						1.在抖音app-我的模块，点击右上角-我的订单-全部订单，找到您购买的课程，点击进入订单详情，点击去学习，即可观看课程;
						
						2.在抖音正式版/极速版，搜索【闪电知道】，点击底部学习按钮，即可观看课程
					</text>
				</view>
				
			</uni-collapse-item>
			<uni-collapse-item title="课程有效期多长？">
				<view class="content">
					<text class="text">
						不同课程有效期不一样，具体查看该课程
					</text>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="如何联系老师？">
				<view class="content">
					<text class="text">
						抖音主页联系
					</text>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="学习看课太卡？">
				<view class="content">
					<text class="text">
						刷新页面、切换网络
					</text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'11123'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
 .content{
	 padding: 20rpx 30rpx;
	 font-size: 12px;
 }
</style>
