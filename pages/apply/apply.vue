<template>
	<view class="content">
		<view class="invite-wrap-title">达人申请入驻</view>
		<view class="form-title">
			<view class="form-title-decoration"></view>
			<view class="form-title-content">联系方式</view>
		</view>
		<view class="example">
			<uni-forms ref="form" :modelValue="formData"  label-position="top">
				<uni-forms-item name="name" label="姓名" required>
					<uni-easyinput v-model="formData.name" type="text" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item name="phone" label="手机号" required>
					<uni-easyinput v-model="formData.phone" type="text" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="note" label="备注">
					<uni-easyinput v-model="formData.note" type="textarea" placeholder="请输入备注信息" />
				</uni-forms-item>
				<button  type="primary" class="button" @click="submit">校验表单</button>
			</uni-forms>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{
					name:'',
					phone:'',
					note:''
				},
				rules: {
					// ...
				}
			}
			
		},
		onLoad() {
			// this.formData.id = 'testId'	
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.baseForm.setRules(this.baseForm)
		},
		methods: {
			
			submit() {
				// 在 onLoad 生命周期中，formData添加了一个 id 字段 ，此时这个字段是不参数校验的，所以结果中不返回
				// 在 validate(['id']) 方法中，指定第一个参数 ，即可返回id字段 ['id'],
				this.$refs.form.validate((err,formData)=>{
					if(!err){
						console.log('success',formData)
						uni.request({
							url:uni.TEACHER_JOIN,
							method:'POST',
							header: {
								'token': uni.getStorageSync('login_session'), //获取登陆信息
								'channel':uni.getStorageSync('login_oauth')
							},
							data:{
								name: formData.name,
								phone:formData.phone,
								note:formData.note,
							},
							success(res){
								console.log(res);
							},
							fail:(res)=> {
								console.log(res.data);
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		background-color: #fff;
		min-height: 100%;
	}
	.invite-wrap-title{
		font-size: 40rpx;
		font-weight: 600;
		color: #343e66;
		line-height: px;
		text-align: center;
		padding: 20rpx;
	}
	.example{
		padding: 0 20rpx 200rpx 20rpx;
	}
	.form-title{
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 24rpx 20rpx;
		font-weight: 400;
		font-size: 28rpx;
	}
	.form-title-decoration{
		width: 8rpx;
		height: 24rpx;
		border-radius: 20rpx;
		margin-right: 12rpx;
		background-color: #2979ff;
	}
</style>
