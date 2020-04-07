<template>
	<view class="">
		 <view class="uni-flex uni-row">
		   <view class="flex-item">A</view>
		   <view class="flex-item">B</view>
		   <view class="flex-item">C</view>
		   <view class="flex-item">C</view>
		 </view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			console.log(option); //打印出上个页面传递的参数。
			uni.showLoading({
				title: "加载中...."
			});
			uni.request({
				url: 'https://mtest.sinosafe.com.cn/micro-plat/commonQuery/queryProductList',
				method: 'POST',
				dataType: 'json',
				header: {
				         'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
				    },
				data: {
					issueChannel: 2,
					salesCode: option.agentcode,
					deptCode: option.deptCode
				},
				success: res => {
					//this.banner = JSON.parse(res.data);
					console.log(res.data.data);
					this.banner = res.data.data.subjects[1].contents;
					console.log(this.banner);
					uni.hideLoading();
				}
			});
		},
		methods: {

		}
	}
</script>

<style lang="scss">
.flex-item{
	width: 25%;
	text-align: center;
}
	
</style>
