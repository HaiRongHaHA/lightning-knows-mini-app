const apis = () => {
	// 抖音登陆接口
	uni.LOGIN_DY_URL = '/svod-api/out/xcx/login/dy'

	// 支付接口
	uni.DY_PAY = '/svod-api/out/xcx/order/add/dy'

	// 获取订单支付状态
	uni.GET_PAYINFO = '/svod-api/out/xcx/order/get/payinfo'

	// 课程列表
	uni.COURSE_LIST = '/svod-api/out/xcx/course/page'

	// 课程详情
	uni.COURSE_DETAIL = '/svod-api/out/xcx/course/detail'

	// 课程章节接口
	uni.COURSE_CHAPTER = '/svod-api/out/xcx/chapter/page'

	// 获取讲师基本信息
	uni.TEACHER_DETAIL = '/svod-api/out/xcx/teacher/info'

	// 学员订单接口
	uni.STUDENT_ORDER = '/svod-api/out/xcx/order/page'

	//讲师申请入驻
	uni.TEACHER_JOIN = '/svod-api/out/xcx/apply/in'
}

export default apis
