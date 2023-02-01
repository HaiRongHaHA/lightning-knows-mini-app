<template>
	<view class="new-home-warp">
		<!-- <uni-nav-bar title="导航栏组件"></uni-nav-bar> -->
		
		<!-- 搜索功能 -->
		<!-- <view class="uni-search-box">
			<uni-search-bar v-model="keyword" ref="searchBar" radius="100" cancelButton="none" disabled placeholder="请输入搜索课程" @click="searchClick" />
			<view class="cover-search-bar" @click="searchClick"></view>
		</view> -->
		<!-- <view class="test">
			<button @click="columnOnclick('4')">测试</button>
		</view> -->
		<!-- banner 轮播图 uni-mt-5-->
		<view class="swiper">
			<swiper class="u-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item @click="teacherapply"><view class="swiper-item"><image src="https://dgicdn.jiandou.vip/s3/1364932886/RWnda8W.png" mode="aspectFill"></image></view></swiper-item>
			</swiper>
		</view>
		
		<!-- menu菜单 uni-mt-5 1.0版本注释-->
		<!-- <view class="menu ">
			<view class="menu-view" v-for="data in menulist" @click.native="gotomenu()">
				<view class="menu_img_box">
					<image class="menu_img" :src="data.url" mode=""></image>
				</view>
				<view class="menu_title">{{data.title}}</view>
			</view>
		</view> -->
		
		<!-- 滚动菜单栏目 -->
		<!-- <view class="main">
			<scroll-view class="scroll-view uni-py-5" :scroll-x="true" scroll-left="0" :show-scrollbar="true" :scroll-with-animation="true">
				<view class="scroll-view-item" v-for="data in menulist" @click.native="gotomenu()">
					<view class="scroll-item-box"><image class="scroll-img" :src="data.url" mode=""></image></view>
					<view class="scroll-item-title">{{data.title}}</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- 查看已购课程 -->
		<!-- <view class="bought"  @click="gotobuycourse()">
			<image src="https://qiniu.htknow.com/37376_9402cfa00be7c7e3075a0155faa95bef.png" mode=""></image>
		</view> -->
		
		 <!-- <view class="chart uni-flex uni-px-5" @click="gotobuycourse()">
		 	<view class="bought">
		 		<view class="bought_left">
		 			<view class="bought_left_top">查看已购课程</view>
					<view class="bought_left_center">查看课程，开始快乐学习</view>
		 		</view>
				<view class="bought_right">
					<image class="bought_right_img" src="https://m.zhishitong.vip/static/q2DZ1OQ.png" mode=""></image>
				</view>
		 	</view>
		 </view> -->
		 
		<!-- chart查看已购课程 uni-mt-5 1.0版本暂不放开-->
		<!-- <view class="chart uni-flex uni-row uni-pa-5 ">
			<view class="chart_left flex-item" @click="gotobuycourse()">
				<view class="chart_left_top">查看已购课程</view>
				<view class="chart_left_center">查看课程，开始快乐学习</view>
				<view class="chart_left_bottom">
					<image class="anima" src="https://m.zhishitong.vip/static/img/index_p.25f2b0e3.png" mode=""></image>
					<text>点击进入</text>
				</view>
			</view>
			<view class="chart_right flex-item">
				<view class="chart_right_item item1" @click="gototeacherapply()">
					<view class="title">申请入驻知识通</view>
					<view class="text">开启知识变现之旅</view>
				</view>
				<view class="chart_right_item item2" @click="gotomenu()">
					<view class="title">查看更多好课程</view>
					<view class="text">精品好课等你</view>
				</view>
			</view>
		</view> -->
		
		<!-- 课程列表 uni-px-7-->
		<view class="column">
			<view class="column_title">课程列表</view>
			<view class="column_item uni-py-5" v-for="(data,index) in column" :key="index" @click.native="columnOnclick(data.courseId)">
				<view class="column_item_left"><image :src="data.showPicUri" mode="aspectFill"></image></view>
				<view class="column_item_right">
					<view class="column_item_top">{{data.title}}</view>
					<view class="column_item_center" v-if="data.payCnt == null">0人在学</view>
					<view class="column_item_center" v-else>{{data.payCnt}}人在学</view>
					<view class="column_item_bottom">
						<view class="column_price">¥ {{toFixed(data.price)}}</view>
						<view class="column_showPrice">¥ {{toFixed(data.showPrice)}}</view>
						<!-- <view class="" v-if="data.payCnt == null ">0人在学</view>
						<view class="" v-else>{{data.payCnt}}人在学</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部logo -->
		<view class="logo" style="display: none;">
			<!-- <image src="https://m.zhishitong.vip/static/img/dibu1.a589d064.png" mode=""></image> -->
			<view class="loge_title">• 知识通 •</view>
			<view class="loge_text">知识达人服务平台</view>
		</view>
		
	</view>
</template>

<script>
	//基础数据
	// import menujson from '@/pages/index/menu.json'
	// import coulumn from '@/pages/index/coulumn.json'
	
	//金额小数点
	import {toFixed} from '@/utils/utils'
	
	export default {
		data() {
			return {
				// 菜单列表
				menulist:[],
				// 课程列表
				column:[],
				title: 'Hello',
				keyword: "",
				input:'',
			}
		},
		onLoad() {
			// this.menulist = menujson
			// this.column = coulumn
			// this.column.push()
			
			// 判断token是否过期，token过期则重新调用login.js
			
			console.log("登陆账号的token为："+uni.getStorageSync('login_session'))
			
			// 获取课程列表
			this.GetCourseList()
		},
		methods: {
			// 金额小数点后两位
			toFixed,
			// 获取首页课程列表
			GetCourseList(){
				const that = this
				uni.request({
					url: uni.COURSE_LIST,
					method:'GET',
					header: {
						'token': uni.getStorageSync('login_session'), //获取登陆信息
						'channel':uni.getStorageSync('login_oauth')
					},
					success: (res) => {
						console.log(res);
						// 数据获取成功
						if(res.data.code ==0){
							that.column = res.data.data.data
						}
					},
					fail:(res)=> {
						console.log(res);
					}
				})
			},
			
			// banner跳转申请页面
			teacherapply(){
				uni.navigateTo({
					url: '/pages/apply/apply'
				})
			},
			
			// 输入框
			inputPlaceholder(e){
				if (uni.getStorageSync('CURRENT_LANG') == "en") {
					return 'Please enter the search content'
				} else {
					return '请输入搜索内容'
				}
			},
			
			// 首页课程点击跳转
			columnOnclick(id){
				// console.log(e)
				uni.navigateTo({
					url:`/pages/detail/detail?courseid=${id}`
				});
			},
			
			// 前往菜单页
			// gotomenu(){
			// 	uni.navigateTo({
			// 		url:'/pages/detail/cate/cate',
			// 		// url: '/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
			
			// 前往已购界面
			// gotobuycourse(){
			// 	uni.switchTab({
			// 		url: '/pages/study/study'
			// 	});
			// },
			
			// 前往申请入驻界面
			// gototeacherapply(){
			// 	uni.navigateTo({
			// 		url:'/pages/apply/apply',
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
			
			// 搜索跳转
			searchClick(){
				uni.navigateTo({
					url:'/pages/search/search',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang="scss">
@import './index.less';
</style>
