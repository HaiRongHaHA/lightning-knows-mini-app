<script>
	import interceptor from '@/request/interceptor.js'
	import apis from '@/request/apis.js'
	export default {
		onLaunch: function() {
			interceptor()
			apis()
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
