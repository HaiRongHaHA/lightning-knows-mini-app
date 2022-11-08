import {
	wx_login
} from './login.js'

const BASE_URL = {
	development: 'http://43.140.194.230', // 开发域名
	production: 'http://43.140.194.230' // 生产域名
}

export const interceptor = () => {
	uni.addInterceptor('request', {
		// 拦截前触发
		invoke(config) {
			config.url = BASE_URL[process.env.NODE_ENV] + config.url
		},
		// 成功回调拦截
		success(res) {
			const {
				code,
				msg
			} = res.data

			// token失效，需登录
			if (code == 4000) {
				wx_login();
				return
			}
			
			// 请求非约定成功code时弹出后端给出的错误信息
			if (code !== 0) {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}
		},
		// 请求网络失败相关
		fail(err) {
			uni.showToast({
				icon: 'none',
				title: '网络走丢了哦～'
			})
		}
	})
}

export default interceptor
