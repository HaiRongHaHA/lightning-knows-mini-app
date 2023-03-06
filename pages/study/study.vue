<template>
	<view class="">
		<view class="blank" v-show="hascourse == 0">
			<view class="empty"><view class="empty_box"><image class="empty_img" src="https://m.zhishitong.vip/static/img/wushuju.e16c3059.png" mode="aspectFill"></image></view><view class="empty_text">没有要学习的课程</view></view>
			<!-- <button class="home">去首页逛逛</button> -->
		</view>
		<view class="course-list" v-show="hascourse ==1">
			<view class="course-item">
				<!-- 课程列表 -->
				<view class="column uni-px-5">
					<view class="column_item uni-py-5" v-for="(data,index) in courselist" :key="index" @click.native="coursedetail(data.courseId)">
						<view class="column_item_left"><image :src="data.courseShowPicUrl" mode="aspectFill"></image></view>
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
	import { setStorageSync,getStorageSync } from '@/request/login.js'
	export default {
		data() {
			return {
				//课程列表
				courselist:[],
				//是否存在课程 0没有课程  1有课程
				hascourse:0
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.req()
			// console.log(tt.getStorageSync('login_userInfo'))
		},
		methods: {
			req(){
				const that = this;
				uni.request({
					url: uni.STUDENT_ORDER,
					method:'GET',
					header: {
						'token': getStorageSync('login_session'), //获取登陆信息
						'channel':getStorageSync('login_oauth')
					},
					data:{
						pageSize:999
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							//没有数据  0没有数据 1有数据
							if(res.data.data.total==0){
								that.hascourse = 0
							}else{
								that.hascourse = 1
								that.courselist = res.data.data.data
							}
						}
						
					},
					fail:(res)=> {
						console.log(res);
					}
				})
			},
			coursedetail(id){
				// console.log("跳转详情页");
				uni.navigateTo({
					url:`/pages/detail/detail?course_id=${id}`
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
		background-color: #fff;
		border-radius: 20rpx;
		
		.column_item{
		    height: 160rpx;
		    // margin-top: 19px;
		    display: flex;
			flex-direction: row;
			border-bottom: 1px solid #eaeaea;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
			text-overflow: ellipsis;
			
			.column_item_left{
			    margin-right: 20rpx;
				
				uni-image{
					width: 212rpx;
					height: 100%;
					border-radius: 12rpx;
					display: inline-block;
					overflow: hidden;
					position: relative;
				}
				image{
					width: 212rpx;
					height: 100%;
					border-radius: 12rpx;
					display: inline-block;
					overflow: hidden;
					position: relative;
				}
			}
			
			.column_item_right{
			    display: flex;
			    flex-direction: column;
			    justify-content: space-between;
			    width: 100%;
				overflow: hidden;
				
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
			}
		}
		.column_item:last-child{
			border-bottom:none;
		}
		
	}

</style>
