<script>
	export default {
		onLaunch: function() {
			
			// 后端api接口
			uni.HOSTS_URL = 'http://43.140.194.230'
			
			// 抖音登陆接口
			uni.LOGIN_DY_URL = uni.HOSTS_URL + '/svod-api/out/xcx/login/dy'
			
			// 支付接口
			uni.DY_PAY = uni.HOSTS_URL + '/svod-api/out/xcx/order/add/dy'
			
			// 获取订单支付状态
			uni.GET_PAYINFO = uni.HOSTS_URL + '/svod-api​/out​/xcx​/order​/get​/payinfo'
			
			// 课程列表
			uni.COURSE_LIST = uni.HOSTS_URL + '/svod-api/out/xcx/course/page'
			
			// 课程详情
			uni.COURSE_DETAIL = uni.HOSTS_URL + '/svod-api/out/xcx/course/detail'
			
			// 课程章节接口
			uni.COURSE_CHAPTER = uni.HOSTS_URL + '/svod-api/out/xcx/chapter/page'
			
			// 获取讲师基本信息
			uni.TEACHER_DETAIL = uni.HOSTS_URL + '/svod-api/out/xcx/teacher/info'
			
			// 学员订单接口
			uni.STUDENT_ORDER = uni.HOSTS_URL + '/svod-api/out/xcx/order/page'
			
			//讲师申请入驻
			uni.TEACHER_JOIN = uni.HOSTS_URL + '/svod-api/out/xcx/apply/in'
			
			console.log('App Launch')
			// 1、底部logo公共组建
			// 2、立即入驻页面重新填写
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss';
	/* 解决头条小程序组件内引入字体不生效的问题 */
	body {
		background-color: #f6f6f6;
	}
</style>
