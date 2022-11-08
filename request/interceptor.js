import {
	wx_login
} from './login.js'

const BASE_URL = {
	dev: 'http://43.140.194.230', // 开发域名
	prod: 'http://43.140.194.230' // 生产域名
}

export const interceptor = () => {
	uni.addInterceptor('request', {
		// 拦截前触发
		invoke(config) {
			config.url = BASE_URL.dev + config.url
			console.log(config, '// 拦截前触发')
		},
		// 成功回调拦截
		success(res) {
			const {
				code,
				msg
			} = res.data

			// 请求非约定成功code时弹出后端给出的错误信息
			if (code !== 0) {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}

			// token失效，需登录
			if (code == 4000) {
				wx_login();
			}
		},
		fail(err) {
			uni.showToast({
				icon: 'none',
				title: '网络走丢了哦～'
			})
		}
	})
}

export default interceptor
