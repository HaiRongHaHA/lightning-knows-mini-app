<template>
	<view class="page-detail">
		<view class="banner">
			<view class="banner_swiper"><image :src="datail.banner" mode="aspectFill"></image></view>
		</view>
		
		<view class="content">
			<view class="top bg-fff uni-pa-5">
				<!-- 是否购买  0已经支付  1没有支付 -->
				<view class="discount"  v-show="hasPay==1">
					<view class="discount_money">
						<view class="discount_surprice" v-if="datail.price == null">￥0</view>
						<view class="discount_surprice" v-else>￥{{toFixed(datail.price)}}</view>
						<view class="discount_price" v-if="datail.showPrice ==null">￥0</view>
						<view class="discount_price" v-else>￥{{toFixed(datail.showPrice)}}</view>
					</view>
				</view>
				<view class="top_title">{{datail.title}}</view>
				<!-- <view class="top_detail">{{datail.anchorTitle}}</view> -->
				<!-- <view class="top_doc"></view> -->
			</view>
			<view class="user_box uni-mt-5 uni-py-5">
				<view class="user_list">
					<view class="user_item">
						<view class="user_item_top">永久有效</view>
						<view class="user_item_bottom uni-mt-3">有效期</view>
					</view>
					<view class="user_item">
						<view class="user_item_top" v-if="datail.stage==1">更新中</view>
						<view class="user_item_top" v-else-if="datail.stage==0">完结</view>
						<view class="user_item_top" v-else-if="datail.stage==null">完结</view>
						<view class="user_item_bottom uni-mt-3">状态</view>
					</view>
					<view class="user_item">
						<view class="user_item_top" v-if="chapter == null">0人</view>
						<view class="user_item_top" v-else>{{chapter}}节</view>
						<view class="user_item_bottom uni-mt-3">章节数</view>
					</view>
					<view class="user_item">
						<view class="user_item_top" v-if="datail.study == null">0人</view>
						<view class="user_item_top" v-else>{{datail.study}}人</view>
						<view class="user_item_bottom uni-mt-3">在学</view>
					</view>
				</view>
			</view>
			<!-- 教师信息条 -->
			<view class="user_box uni-mt-5">
				<view class="user" >
					<view class="user_info">
						<image class="user_img" :src="teacher.userimg" mode="aspectFill"></image>
						<view class="user_base">
							<view class="user_nickname"> 
								<view class="user_nik">{{teacher.nickname}}</view>
								<!-- <view class="user_course">共{{teacher.number}}门课程</view> -->
							</view>
							<view class="user_desc">{{teacher.userdesc}}</view>
						</view>
					</view>
					<!-- <image class="user_icon" :src='usericon' mode=""></image> -->
				</view>
			</view>
			<!-- 课程内容 -->
			<view class="course_content uni-mt-5">
				<view class="course_content_menu">
					<view :class="content_menu==1?'a1 active':'a1'" @click="content_menu = 1">简介</view>
					<view :class="content_menu==2?'a2 active':'a2'" @click="content_menu = 2">目录</view>
				</view>
				<view class="course_ccc" v-show="content_menu ==1">
					<view class="rich-text-box" style="padding: 40rpx;"><rich-text :nodes="datail.strings"></rich-text></view>
				</view>
				
				<view class="course_list"  v-show="content_menu ==2">
					<!--  @click="chapters(data.chapterId)" -->
					<view class="course_list_item uni-py-5 uni-mx-5" v-for="(data,index) in chapterList" :key="index">
						<view class="left" style="display: flex;align-items: center;">
							<view class="course_nub" style="padding-right: 10px;">{{data.seq}}</view>
							<view class="">
								<view class="list_item_title"><view class="list_item_tt">{{data.title}}</view></view>
								<view class="list_item_content">
									<view class="l_t_bq" v-if="data.type =='VIDEO'">视频</view>
									<view class="l_t_bq" v-else-if="data.type =='VOICE'">音频</view>
									<view class="l_t_bq" v-else>课程</view>
									<!-- <view class="l_t_time">时长：06:58</view> -->
								</view>
							</view>
						</view>
						<view class="right watch disable" style="margin-left: 10px;background: linear-gradient(rgb(73, 157, 255) 0%, rgb(142, 201, 255) 100%);">学习</view>
					</view>
					
				</view>
			</view>
		
		
			<!-- 注意事项 -->
			<view class="notice uni-pa-5  uni-mt-5">
				<view class="notice_title">购课须知</view>
				<view class="notice_item">
					<view class="item_title">
						<!-- <image src="https://m.zhishitong.vip/static/img/bofang.803f5566.png" mode=""></image> -->
						<view class="title_text">1.购买课程后如何观看?</view>
					</view>
					<view class="item_text">平台搜索【闪电课堂】进入小程序，点击底部【学习】按钮，即可观看已购买课程。</view>
				</view>
				<view class="notice_item">
					<view class="item_title">
						<!-- <image src="https://m.zhishitong.vip/static/img/bofang.803f5566.png" mode=""></image> -->
						<view class="title_text">2.购买课程后能否退款?</view>
					</view>
					<view class="item_text">
						自用户购买7天内，若学习累计时长未超过10分钟可申请退款，超过10分钟（包含10分钟）则不可退款。
					</view>
				</view>
				<view class="notice_item">
					<view class="item_title">
						<!-- <image src="https://m.zhishitong.vip/static/img/bofang.803f5566.png" mode=""></image> -->
						<view class="title_text">3.售后问题如何咨询?</view>
					</view>
					<view class="item_text">
						1若您需要咨询涉及老师课程内容相关，可通过私信联系老师进行沟通解答。
					</view>
					<view class="item_text">
						2若您需要咨询涉及闪电课堂程序使用，可点击页面右上角【反馈】按钮进行线上反馈。
					</view>
				</view>
				<view class="notice_item">
					<view class="item_title">
						<!-- <image src="https://m.zhishitong.vip/static/img/bofang.803f5566.png" mode=""></image> -->
						<view class="title_text">4.购课的权益和保障?</view>
					</view>
					<view class="item_text">
						具体请查询《付费课程购买协议》，购买课程即代表您已阅读并同意该协议
					</view>
					<view class="item_text">
						注：小程序内购买会员为会员兑换权益，购买成功后将自动兑换到您的账户内，可在小程序中重复学习观看
					</view>
				</view>
			</view>
		
			<view class="" style="height: 80px;"></view>
			<zijie-pay-button v-if="datail.outCourseId" :mode="2" :goodsId="datail.outCourseId" />
		</view>
		
		
		<!-- 是否购买  0已经支付  1没有支付 -->
		<!-- <view class="goods-carts" v-show="hasPay ==1">
			<uni-section title="自定义用法" type="line"> 未支付
				<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
					@buttonClick="buttonClick" />
			</uni-section>
		</view> -->
		
		<!-- <view class="goods-carts" v-show="hasPay ==0">
			<uni-section title="自定义用法" type="line"> 已经支付
				<uni-goods-nav :fill="true" :options="options1" :button-group="customButtonGroup2" @click="onClick1"
					@buttonClick="buttonClick1" />
			</uni-section>
		</view> -->
	</view>
</template>

<script>
	
	import {toFixed} from '@/utils/utils'
	export default {
		data() {
			return {
				// 目录切换
				content_menu:1,
				
				// 是否购买  0已经支付  1没有支付  3默认全都不显示
				hasPay:3,
				
				// 底部按钮  没有购买
				customButtonGroup1: [{
					text: '立即购买',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
				
				// 底部按钮  已经购买
				customButtonGroup2: [{
					text: '立即学习',
					backgroundColor: 'linear-gradient(90deg, #004ff6, #2627e5)',
					color: '#fff'
				}],
				
				// 底部左边按钮{	icon: 'headphones',text: '咨询',}
				options: [],
				options1:[],
				
				//课程信息
				datail:{
					outCourseId:"",
					banner:"",
					title:"",
					anchorTitle:'',
					stage:0,
					study:"",
					strings: ''
				},
				
				// 讲师信息
				teacher:{
					userimg:'',
					nickname:'',
					number:'',
					userdesc:''
				},
				// 章节列表
				chapterList:[],
				
				// 课程id
				courseid:'0',
				chapter:'0'
			}
		},
		onLoad(e){
			if(e.courseid){
				// 获取当前的课程id
				this.courseid = e.courseid
				// 获取章节列表接口
				this.getchapterslist(e.courseid)
				// 获取课程详情接口
				this.getcoursedetail(e.courseid)
			}
			
		},
		methods: {
			toFixed,
			
			// 立即支付按钮
			buttonClick(e){
				const detail = {
					'userimg':this.teacher.userimg,
					'nickname':this.teacher.nickname,
					'banner':this.datail.banner,
					'title':this.datail.title,
					'price':this.datail.price,
					'chapter':this.chapter
				}
				const content = JSON.stringify(detail)
				// console.log(content);
				uni.navigateTo({
					url:`/pages/pay/pay?courseid=${this.courseid}&detail=${content}`
				});
			},
			// 立即学习按钮
			buttonClick1(e){
				uni.navigateTo({
					url:`/pages/chapters/chapters?courseid=${this.courseid}`
				});
			},
			// 试看链接
			chapters(){
				console.log("试看 ")
				uni.navigateTo({
					url:'/pages/chapters/chapters',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			// 获取章节列表
			getchapterslist(id){
				const that = this;
				uni.request({
					url: uni.COURSE_CHAPTER,
					method:'GET',
					header: {
						'token': uni.getStorageSync('login_session'), //获取登陆信息
						'channel':uni.getStorageSync('login_oauth')
					},
					data:{
						courseId: id
					},
					success(res){
						console.log(res);
						if(res.data.data){
							// 获取章节列表信息
							that.chapterList = res.data.data.data;
							//获取章节总数
							that.chapter = res.data.data.total;
						}
					},
					fail:(res)=>{
						console.log(res.data);
					}
				})
			},
			
			// 获取课程详情
			getcoursedetail(id){
				const that = this;
				uni.request({
					url: uni.COURSE_DETAIL,
					method:'GET',
					header: {
						'token': uni.getStorageSync('login_session'), //获取登陆信息
						'channel':uni.getStorageSync('login_oauth')
					},
					data:{
						courseId: id,
					},
					success(res){
						console.log(res)
						const CourseDetail = res.data.data;
						if(CourseDetail){
							that.datail={
								outCourseId: CourseDetail.outCourseId,
								'banner':CourseDetail.showPicUri,// 课程图片
								'title':CourseDetail.title,// 课程标题
								'showPrice':CourseDetail.showPrice,// 课程划线价格
								'study':CourseDetail.payCnt,// 课程在学人数
								'price':CourseDetail.price, //课程价格
								'anchorTitle':CourseDetail.anchorTitle, //视频挂载标题
								'strings':CourseDetail.note,// 课程详情
								'stage':CourseDetail.stage,// 课程状态
							}
							// 设置导航条
							uni.setNavigationBarTitle({
								title: that.datail.title
							});
							// 获取导师信息
							that.getTeacherDetail(CourseDetail.teacherId)
							if(CourseDetail.hasPay==false){
								// 没有支付
								that.hasPay = 1
							}else{
								// 已经支付
								that.hasPay = 0
							}
							// console.log(that.hasPay)
						}
						 
					},
					fail:(res)=> {
						console.log(res.data);
					}
				})
			},
			
			// 获取讲师信息详情
			getTeacherDetail(id){
				const that = this;
				uni.request({
					url: uni.TEACHER_DETAIL,
					method:'GET',
					header: {
						'token': uni.getStorageSync('login_session'), //获取登陆信息
						'channel':uni.getStorageSync('login_oauth')
					},
					data:{
						id: id
					},
					success(res) {
						console.log(res)
						const TeacherDetail = res.data.data;
						that.teacher={
							'userimg':TeacherDetail.headimgurl,
							'nickname':TeacherDetail.nickname,
							'userdesc':TeacherDetail.note,
						}
					},
					fail:(res)=> {
						console.log(res.data);
					}
				})
			}
		
		}
	}
</script>

<style lang="scss">
		.box_content{
		    background: #ededed;
		    min-height: 100vh;
		}
		.banner_swiper image{
			width: 100%;
		}
		.top{
			font-size: 28rpx;
		}
		.user_box{
		    width: 100%;
		    /* padding: 15px; */
		    box-sizing: border-box;
		    background-color: #fff;
		}
		/* .user_list{
			display: flex;
		} */
		
		// 价格 标题
		.discount{
			.discount_surprice{
				font-size: 23px;
				color: red;
				font-weight: 800;
			}
			.discount_price{
				text-decoration: line-through;
				font-size: 28rpx;
				color: #9e9eb0;
			}
		}
		
		
		
		
		/* user box  用户信息*/
		/* .user_box{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			background-color: #fff;
			margin-top: 10px;
		} */
		.user{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			/* background: #f8faff; */
			border-radius: 4px;
		}
		.user_info{
			display: flex;
			    flex-direction: row;
		}
		.user_img{
			width: 40px;
			height: 40px;
			display: block;
			border-radius: 20px;
		}
		.user_base{
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.user_nickname{
		    font-size: 14px;
		    display: flex;
		    align-items: center;
		}
		.user_course{
			line-height: 20px;
			margin: 0px 10px;
			color: rgb(96, 123, 204);
			border: 1px solid rgb(168, 170, 255);
			font-size: 10px;
			padding: 0px 5px;
			white-space: nowrap;
			height: max-content;
		}
		.user_desc{
		    font-size: 12px;
		    color: #999;
		    display: inline-block;
		    white-space: nowrap;
		    width: 218px;
		    overflow: hidden;
		    text-overflow: ellipsis;
		}
		.user_icon{
			width: 8px;
			height: 13px;	
		}
		.user_list{
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.user_item{
		    text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.user_item_top{
			font-size: 28rpx;
			font-weight: 400;
			color: #333;
		}
		.user_item_bottom{
			font-size: 24rpx;
			font-weight: 400;
			color: #999;
			margin-top: 12rpx;
		}
		.user_item:nth-last-child(1) {
		    border: none;
		}
		.course_content{
		    /* margin-top: 10px; */
		    background: #fff;
			/* padding-top: 10px;
			padding-bottom: 10px;
			padding-left: 15px;
			padding-right: 15px; */
		}
		.course_content_menu{
		    display: flex;
		    flex-direction: row;
		    justify-content: space-around;
		    text-align: center;
		    height: 80rpx;
		    line-height: 80rpx;
		    border-bottom: 1px solid #dcdcdc;
		    color: #b8b8b8;
		    /* margin-left: 15px;
		    margin-right: 15px; */
		}
		.a1, .a2{
		    width: 50%;
			font-size: 28rpx;
		}
		.active{
		    color: #000!important;
		}
		/* 简介内容 */
		.course_ccc{
			
		}
		/* 课程列表 */
		.course_list{
			/* padding-left: 15px;
			padding-right: 15px;
			padding-bottom: 20px *//* min-height: 200px; */;
		}
		.course_list_item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			/* padding-top: 10px;
			padding-bottom: 10px; */
			border-bottom: 2rpx solid #dcdcdc;
		}
		.course_list_item:last-child{
			border-bottom: none;
		}
		.course_nub{
			font-size: 24rpx;
		}
		
		.list_item_title{
			display: flex;
			align-items: center;
		}
		.list_item_tt{
			margin-left: 10rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #000;
		}
		.list_item_content{
			display: flex;
			font-size: 24rpx;
			color: #666;
			align-items: center;
			margin-left: 10rpx;
			margin-top: 20rpx;
		}		
		.l_t_bq{
			border: 1px solid #3c95ff;
			padding: 0 4px;
			margin-right: 10px;
			border-radius: 2px;
			color: #3c95ff;
		}
		.l_t_time{
			
		}
		
		.disable{
		    background: #ccc!important;
		}
		.watch{
		    height: 40rpx;
		    width: 60rpx;
		    font-size: 24rpx;
		    text-align: center;
		    line-height: 40rpx;
		    background: linear-gradient(18deg, #6A19D9, #EE7DFF);
		    color: #fff;
		    padding: 4rpx 40rpx;
		    border-radius: 30rpx;
		}
		
		
		/* 注意事项 */
		.notice{
		    background-color: #fff;
			
			.notice_title{
			    font-size: 32rpx;
				// text-align: center;
			}
			.notice_item{
			    // padding: 20rpx;
			    padding-top: 20rpx;
				padding-bottom: 0;
			    // border-radius: 30rpx;
			    /* border: 1rpx solid #c0c4cc; */
			    // margin-top: 20rpx;
				.item_title{
					display: flex;
					font-size: 24rpx;
				}
				.item_title image{
					width: 30rpx;
					height: 30rpx;
					margin: auto 0;
					margin-right: 14rpx;
				}
				
				.title_text{
					font-weight: 700;
				}
				.item_text{
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #9e9eb0;
				}
			}
		}
		
		
		
		
		/* 底部导航 */
		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
		.bg-fff{
			background-color: #fff;
		}
</style>
