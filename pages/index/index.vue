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
      <swiper
        class="u-swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="10000"
        :duration="500"
      >
        <swiper-item
          @click="teacherapply(data.url)"
          v-for="(data, index) in BannerList"
          :key="index"
        >
          <view class="swiper-item">
            <image :src="data.content" mode="aspectFill"></image>
          </view>
        </swiper-item>
        <!-- <swiper-item @click="teacherapply"><view class="swiper-item"><image src="https://dgicdn.jiandou.vip/s3/1364932886/RWnda8W.png" mode="aspectFill"></image></view></swiper-item> -->
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
      <view
        class="column_item uni-py-5"
        v-for="(data, index) in column"
        :key="index"
        @click.native="columnOnclick(data.courseId)"
      >
        <view class="column_item_left"
          ><image :src="data.showPicUri" mode="aspectFill"></image
        ></view>
        <view class="column_item_right">
          <view class="column_item_top">{{ data.title }}</view>
          <view class="column_item_center" v-if="data.showNum == null"
            >0人在学</view
          >
          <view class="column_item_center" v-else
            >{{ data.showNum }}人在学</view
          >
          <view class="column_item_bottom">
            <view class="column_price">¥ {{ toFixed(data.price) }}</view>
            <view class="column_showPrice"
              >¥ {{ toFixed(data.showPrice) }}</view
            >
            <!-- <view class="" v-if="data.payCnt == null ">0人在学</view>
						<view class="" v-else>{{data.payCnt}}人在学</view> -->
          </view>
        </view>
      </view>
    </view>

    <view v-show="isLoadMore">
      <!-- //loading加载提示处 -->
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>

    <!-- 底部logo -->
    <view class="logo" style="display: none">
      <!-- <image src="https://m.zhishitong.vip/static/img/dibu1.a589d064.png" mode=""></image> -->
      <!-- <view class="loge_title">• 知识通 •</view>
			<view class="loge_text">知识达人服务平台</view> -->
    </view>
  </view>
</template>

<script>
//基础数据
// import menujson from '@/pages/index/menu.json'
// import coulumn from '@/pages/index/coulumn.json'
import { setStorageSync, getStorageSync } from "@/request/login.js"

//金额小数点
import { toFixed } from "@/utils/utils"

export default {
  data() {
    return {
      // 菜单列表
      menulist: [],

      // 首页banner图片
      BannerList: [],

      title: "Hello",
      keyword: "",
      input: "",

      // 课程列表
      column: [],
      page: 1,
      pageSize: 10,
      total: 0,
      lock: false,
      loadStatus: "loading", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore: false, //是否加载中
    }
  },
  onLoad() {
    // this.menulist = menujson
    // this.column = coulumn
    // this.column.push()
    // 判断token是否过期，token过期则重新调用login.js
    // console.log("登陆账号的token为："+uni.getStorage('login_session'))
    // 获取课程列表
    // this.GetCourseList()
  },
  onShow() {
    // if(uni.getStorage('login_session')){
    // 	this.GetCourseList()
    // }
    this.GetCourseList()

    this.GetBannerList()
  },
  onReachBottom() {
    //上拉触底函数
    if (!this.lock) {
      //此处判断，上锁，防止重复请求
      this.lock = true
      this.page += 1
      this.GetCourseList()
    }
  },
  methods: {
    // 金额小数点后两位
    toFixed,

    // 获取首页bnaner图列表
    GetBannerList() {
      const that = this
      uni.request({
        url: uni.BANNER_LIST,
        method: "GET",
        data: {
          page: "HOME_PAGE",
          widget: "BANNER",
        },
        success: (res) => {
          // console.log(res);
          if (res.data.data) {
            that.BannerList = res.data.data
          }
        },
        fail: (res) => {
          console.log(res)
        },
      })
    },

    // 获取首页课程列表
    GetCourseList() {
      uni.request({
        url: uni.COURSE_LIST,
        method: "GET",
        header: {
          token: getStorageSync("login_session"), //获取登陆信息
          channel: getStorageSync("login_oauth"),
        },
        data: {
          pageNo: this.page,
          pageSize: this.pageSize,
        },
        success: (res) => {
          const {
            code,
            data: { data, total, pageNo },
          } = res.data
          this.total = total
          // 数据获取成功
          if (code == 0) {
            if (pageNo <= 1) {
              this.column = []
            }
            if (!data || data.length < 1) {
              this.lock = false
              this.setListNoMore()
              return
            }
            const res = this.column.concat(data)
            if (res.length >= total) {
              this.setListNoMore()
            }
            this.column = res
          } else {
            this.resetPage()
          }
          this.lock = false
        },
        fail: (res) => {
          this.lock = false
          this.resetPage()
        },
      })
    },
    setListNoMore() {
      this.isLoadMore = true
      this.loadStatus = "nomore"
    },
    resetPage() {
      this.isLoadMore = false
      if (this.page > 1) {
        this.page -= 1
      }
    },
    // banner跳转申请页面
    teacherapply(url) {
      console.log(url)
      uni.navigateTo({
        url: url,
      })
    },

    // 输入框
    inputPlaceholder(e) {
      if (uni.getStorageSync("CURRENT_LANG") == "en") {
        return "Please enter the search content"
      } else {
        return "请输入搜索内容"
      }
    },

    // 首页课程点击跳转
    columnOnclick(id) {
      // console.log(e)
      uni.navigateTo({
        url: `/pages/detail/detail?course_id=${id}`,
      })
    },
    // 搜索跳转
    searchClick() {
      uni.navigateTo({
        url: "/pages/search/search",
        success: (res) => {},
        fail: () => {},
        complete: () => {},
      })
    },
  },
}
</script>

<style lang="scss">
@import "./index.less";
</style>
