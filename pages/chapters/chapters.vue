<template>
	<view>
		<view class="video_box">
			<video :src="course.mediaUri" ref="myVideo" id="myVideo" controls show-loading></video>
		</view>
		<view class="content">
			<view class="title">{{course.title}}</view>
			<view class="details">
				<view class="left">
					<view class="">已更课时：<span>{{total}}课时</span></view>
				</view>
				<!-- <uni-icons type="bars" size="15"></uni-icons> -->
				<!-- <view class="right">
					<view class="">
						<uni-icons type="fire-filled" color="red" size="15"></uni-icons>
					6324热度</view>
				</view> -->
			</view>
			<view class="list">
				<!-- <uni-icons type="list" size="15"></uni-icons> -->
				<view class="list_title">课时列表</view>
				<view class="item" v-for="(data,index) in chapterList" :key="index" @click="choosewatch(data,index)">
					<view class="item_title">{{data.title}}</view>
					<view class="item_content">
						<view class="item_left">
							<view class="sk" v-if="data.type=='VIDEO'">视频</view>
							<view class="sk" v-else-if="data.type=='VOICE'">音频</view>
							<!-- <view class="time">08:30</view>
							<view class="sk1">试看</view> -->
						</view>
						<view class="item_right" v-show="current===index&&isActive">当前学习</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { setStorageSync,getStorageSync } from '@/request/login'
	export default {
		data() {
			return {
				course:{
					mediaUri:'',
					title:'',
					type:'',
				},
				chapterList:[],
				total:'',
				
				current:null,
				isActive:false,
				
				hasPay:'',
				nub:''
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
			// console.log(this.videoContext)
		},
		onLoad(e) {
			if(e.hasTry =='1'){
				//当前为试看，1为试看
				this.getchapterslist({
					id:e.courseid,
					nub:null,
					hasPay:false,
					hasTry:true
				});
			}else{
				//当前正常购买
				this.courseid = e.courseid;
				let str = decodeURIComponent(e.chapter)
				const chapterData = JSON.parse(str);
				this.hasPay = e.hasPay;
				this.nub = chapterData.nub;
				console.log("是否支付 "+this.hasPay);
				console.log("当前选择的是第"+this.nub+"章节");
				if(e.courseid){
					this.getchapterslist({
						id:e.courseid,
						nub:chapterData.nub,
						hasPay:e.hasPay,
						hasTry:false
					});
				}
			}
		},
		methods: {
			// 获取章节列表
			getchapterslist(e){
				// console.log(e);
				const that = this;
				uni.request({
					url: uni.COURSE_CHAPTER,
					method:'GET',
					header: {
						'token': getStorageSync('login_session'), //获取登陆信息
						'channel':getStorageSync('login_oauth')
					},
					data:{
						courseId: e.id
					},
					success(res) {
						// console.log(res);
						if(res.data){
							// 获取章节列表信息
							that.chapterList = res.data.data.data;
							
							//获取章节总数
							that.total = res.data.data.total;
							
							//判断是否是 选择具体章节跳转过来的
							if(that.nub){
								that.choosewatch(that.chapterList[that.nub],that.nub)
							}else{
								that.choosewatch(that.chapterList[0],0)
							}
							
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				})
			},
			
			// 当前列表章节点击
			choosewatch(item,index){
				// console.log(item)   具体内容
				// console.log(index)  第几章节
				// console.log(this.hasPay)
				
				//章节数据免费的时候可以看 或者 已经支付的都可以看
				if(item.free||this.hasPay){
					// 设置导航条
					uni.setNavigationBarTitle({
						title: item.title
					});
					
					this.course = {
						'mediaUri':item.mediaUri,
						'title':item.title,
						'type':item.type
					}
					
					if(this.current===index){
						// this.isActive = !this.isActive; 
						return console.log('fine')
					}else{ 
						this.isActive=true 
					}
					this.current=index
				}else{
					uni.showToast({
						icon: 'none',
						title: '课程未购买解锁哦～'
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.video_box uni-video,video{
		width: 100%;
	}
	.content{
		padding: 20rpx;
	}
	.title{
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
	}
	.details{
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #eeeeee;
		font-size: 24rpx;
	}
	.details .left,.details .right{
		display: flex;
		align-items: center;
	}
	.list{
		margin-top: 30rpx;
	}
	.list_title{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 400;
		color: #333;
	}
	.item_title{
		margin: 30rpx 0;
		font-size: 24rpx;
	}
	.item_content{
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
	}
	.item_left{
		display: flex;
		font-size: 24rpx;
		font-weight: 400;
		color: #999;
		align-items: center;
	}
	.sk{
		padding: 0 16rpx;
		background-color: #3c8aff;
		color: #fff;
		border-radius: 40rpx;
		margin-right: 8rpx;
	}
	.sk1{
		padding: 0 16rpx;
		background-color: #ccc;
		color: #fff;
		border-radius: 40rpx;
		margin-left: 8rpx;
	}
	.item_right{
		padding: 0 18rpx;
		background-color: #3c8aff26;
		color: #3c8aff;
		border-radius: 40rpx;
	}
	.active{
		color: #3c8aff;
	}
</style>
