
export const token_Interceptor =()=>{
	uni.addInterceptor('request', {
		  // 拦截前触发
		  invoke(args){
			// request 触发前拼接 url 
			// args.url = 'https://www.example.com/'+args.url
			console.log(args)
		  },
		  // 成功回调拦截
		  success(args){
			console.log(args)
			// token失效
			if(args.data.code==4000){
				wx_login();
			}
		  },
		  fail(err) {
		    console.log('interceptor-fail',err)
		  }
	})
}