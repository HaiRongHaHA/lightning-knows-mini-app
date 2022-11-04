<template>
	<view class="">
		<view class="blank" v-show="hascourse == 0">
			<view class="empty"><view class="empty_box"><image class="empty_img" src="https://m.zhishitong.vip/static/img/wushuju.e16c3059.png" mode=""></image></view><view class="empty_text">没有要学习的课程</view></view>
			<!-- <button class="home">去首页逛逛</button> -->
		</view>
		<view class="course-list" v-show="hascourse ==1">
			<view class="course-item">
				<!-- 课程列表 -->
				<view class="column uni-px-5">
					<view class="column_item uni-py-5" v-for="(data,index) in courselist" :key="index" @click.native="coursedetail(data.courseId)">
						<view class="column_item_left"><image :src="data.courseShowPicUrl"></image></view>
						<view class="column_item_right">
							<view class="column_item_top">{{data.courseTitle}}</view>
							<view class="column_item_bottom">
								<view class="">已购</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//课程列表
				courselist:[],
				//是否存在课程 0没有课程  1有课程
				hascourse:0
			}
		},
		onLoad() {
			const that = this;
			uni.request({
				url: uni.STUDENT_ORDER,
				method:'GET',
				header: {
					'token': uni.getStorageSync('login_session'), //获取登陆信息
					'channel':uni.getStorageSync('login_oauth')
				},
				success(res) {
					console.log(res)
					//没有数据  0没有数据 1有数据
					if(res.data.data.total==0){
						that.hascourse = 0
					}else{
						that.hascourse = 1
						that.courselist = res.data.data.data
					}
				},
				fail:(res)=> {
					console.log(res);
				}
			})
		},
		methods: {
			coursedetail(id){
				uni.navigateTo({
					url:`/pages/detail/detail?courseid=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
//空白数据
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

// 课程具体列表
	.column{
		// padding-bottom: 16px;
		background-color: #fff;
		// margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
		// margin-top: 16px;
		.column_title{
			display: flex;
			align-items: center;
			padding: 8rpx;
			padding-top: 20rpx;
			flex-direction: row;
			font-size: 28rpx;
			font-weight: 900;
		}
		.column_title image{
			width: 27rpx;
			height: 27rpx;
			margin-right: 4rpx;
		}
		.column_box{
			padding: 0px 16rpx;
		}
		.column_img_box{
		    height: 128rpx;
		    position: relative;
		    border-radius: 8px;
		    overflow: hidden;
		}
		.column_text{
			width: 100%;
			height: 25px;
			position: absolute;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
			color: #fff;
			padding-left: 14px;
			box-sizing: border-box;
			font-size: 14px;
			line-height: 24px;
		}
		.column_item{
		    height: 80px;
		    // margin-top: 19px;
		    display: flex;
			flex-direction: row;
			border-bottom: 1px solid #eaeaea;
		}
		.column_item:last-child{
			border-bottom:none;
		}
		.column_item_left{
		    margin-right: 20rpx;
		}
		.column_item_left uni-image{
			width: 212rpx;
			height: 160rpx;
			border-radius: 12rpx;
			display: inline-block;
			overflow: hidden;
			position: relative;
		}
		.column_item_left image{
			width: 212rpx;
			height: 160rpx;
			border-radius: 12rpx;
			display: inline-block;
			overflow: hidden;
			position: relative;
		}
		.column_item_right{
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
		    width: 100%;
		}
		.column_item_top{
			font-size: 28rpx;
			font-weight: 700;
			color: #333;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
			text-overflow: ellipsis;
			display: inline-block;
		}
		.column_item_center{
		    width: -webkit-max-content;
		    width: max-content;
		    font-size: 20rpx;
		    font-weight: 400;
		    color: #2770ff;
		    border: 1px solid #2770ff;
		    border-radius: 4rpx;
		    background-color: #d4e2ff;
		    padding: 4rpx 8rpx;
		}
		.column_item_bottom{
		    display: flex;
		    justify-content: space-between;
			align-items: baseline;
			flex-direction: row;
			font-size: 28rpx;
			color: #999;
		}
		.column_price{
			font-size: 28rpx;
			color: red;
		}
	}
	

</style>
