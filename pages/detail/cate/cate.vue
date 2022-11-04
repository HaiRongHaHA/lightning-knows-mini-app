<template>
	<view>
		<view class="cate_list">
			
		</view>
		<view class="second_list">
			<view :class="content_menu==1?'second_item active1':'second_item'" @click="content_menu = 1">语言教学</view>
			<view :class="content_menu==2?'second_item active1':'second_item'" @click="content_menu = 2">美食烹饪</view>
			<view :class="content_menu==3?'second_item active1':'second_item'" @click="content_menu = 3">文艺生活</view>
			<view :class="content_menu==4?'second_item active1':'second_item'" @click="content_menu = 4">技能培训</view>
			<view :class="content_menu==5?'second_item active1':'second_item'" @click="content_menu = 5">职业教育</view>
			<view :class="content_menu==6?'second_item active1':'second_item'" @click="content_menu = 6">兴趣爱好</view>
		</view>
		
		<view class="column uni-px-5">
			<view class="column_item uni-py-5">
				<view class="column_item_left">
					<image src="https://dgicdn.jiandou.vip/s3/1364932886/OOGvogG.png?imageView2/1/w/400/h/300"></image>
				</view>
				<view class="column_item_right">
					<view class="column_item_top">高情商聊天技巧</view>
					<view class="column_item_center">小仓老师</view>
					<view class="column_item_bottom"><view class="">共3节课</view><view class="">¥39.9</view></view>
				</view>
			</view>
			<view class="column_item uni-py-5">
				<view class="column_item_left">
					<image src="https://dgicdn.jiandou.vip/s3/1364932886/OOGvogG.png?imageView2/1/w/400/h/300"></image>
				</view>
				<view class="column_item_right">
					<view class="column_item_top">高情商聊天技巧</view>
					<view class="column_item_center">小仓老师</view>
					<view class="column_item_bottom"><view class="">共3节课</view><view class="">¥39.9</view></view>
				</view>
			</view>
			<view class="column_item uni-py-5">
				<view class="column_item_left">
					<image src="https://dgicdn.jiandou.vip/s3/1364932886/OOGvogG.png?imageView2/1/w/400/h/300"></image>
				</view>
				<view class="column_item_right">
					<view class="column_item_top">高情商聊天技巧</view>
					<view class="column_item_center">小仓老师</view>
					<view class="column_item_bottom"><view class="">共3节课</view><view class="">¥39.9</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 目录切换
				content_menu:1
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	
// 滚动条
.second_list{
	white-space: nowrap;
	overflow-x: auto;
	padding: 0 20rpx;
	background-color: #fff;
	.second_item{
		width: 200rpx;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		align-items: center;
		flex-direction: column;
		color: #000;
		font-size: 24rpx;
		// margin-bottom: 15px;
		display: inline-block;
		margin-right: 20rpx;
	}
}
.active1{
	font-size: 28rpx !important;
	font-weight: 700;
	color: #2770ff  !important;
    border-bottom: 1px solid;
}
// 滚动条样式
.second_list::-webkit-scrollbar{
	display: none!important;
	width: 48px!important;
	height: 3px!important;
	background-color: #ccc!important;
}
.second_list::-webkit-scrollbar-button{
	display: none;
	width: 156rpx;
	background-color: #fff;
}
.second_list::-webkit-scrollbar-thumb {
	display: none;
	background-color: #267bfa;
	border-radius: 13rpx;
}
.second_list::-webkit-scrollbar-track {
	border-radius: 13rpx;
}
.second_list::scrollbar{
	display: none!important;
	width: 48px!important;
	height: 3px!important;
	background-color: #ccc!important;
}


// 课程列表
.new_item{
		display: flex;
	    flex-direction: row;
	    margin: 0;
	    padding: 0;
	    border-bottom: 1px solid #c9c9c9;
	    padding-bottom: 10px;
	    padding-top: 10px;
	
	.new_user_img{
	    width: 400px;
	    height: 300px;
	    zoom: .3;
	    display: block;
		
	}
	.new_content{
	    margin-left: 10px;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    width: 100%;
		
		.new_title{
		    font-size: 14px;
		}
		.new_user{
			    display: flex;
			    flex-direction: row;
			    font-size: 12px;
			    color: #666;
			    line-height: 20px;
		}
		.new_doc{
			    font-size: 12px;
			    color: #666;
		}
	}
}

// 课程具体列表
	.column{
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 20rpx;
		.column_title{
			display: flex;
			align-items: center;
			padding: 8rpx;
			padding-top: 20rpx;
			flex-direction: row;
			font-size: 28rpx;
			font-weight: 900;
		}
		.column_title image{
			width: 27rpx;
			height: 27rpx;
			margin-right: 4rpx;
		}
		.column_box{
			padding: 0px 16rpx;
		}
		.column_img_box{
		    height: 128rpx;
		    position: relative;
		    border-radius: 8px;
		    overflow: hidden;
		}
		.column_text{
			width: 100%;
			height: 25px;
			position: absolute;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
			color: #fff;
			padding-left: 14px;
			box-sizing: border-box;
			font-size: 14px;
			line-height: 24px;
		}
		.column_item{
		    height: 80px;
		    // margin-top: 19px;
		    display: flex;
			flex-direction: row;
			border-bottom: 1px solid #eaeaea;
		}
		.column_item:last-child{
			border-bottom:none;
		}
		.column_item_left{
		    margin-right: 20rpx;
		}
		.column_item_left uni-image{
			width: 212rpx;
			height: 160rpx;
			border-radius: 12rpx;
			display: inline-block;
			overflow: hidden;
			position: relative;
		}
		.column_item_left image{
			width: 212rpx;
			height: 160rpx;
			border-radius: 12rpx;
			display: inline-block;
			overflow: hidden;
			position: relative;
		}
		.column_item_right{
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
		    width: 100%;
		}
		.column_item_top{
		    font-size: 28rpx;
		    font-weight: 400;
		    color: #333;
		}
		.column_item_center{
		    width: -webkit-max-content;
		    width: max-content;
		    font-size: 24rpx;
		    font-weight: 400;
		    color: #2770ff;
		    border: 1px solid #2770ff;
		    border-radius: 4rpx;
		    background-color: #d4e2ff;
		    padding: 4rpx 8rpx;
		}
		.column_item_bottom{
		    display: flex;
		    justify-content: space-between;
			flex-direction: row;
			font-size: 20rpx;
			color: #999;
		}
	}
</style>
