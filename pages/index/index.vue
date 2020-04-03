<template>
	<view>
		<!-- banner图 -->
		<swiper class="swiper banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval"
		 :duration="duration">
			<swiper-item v-for="(item,index) in banner" :key="index" @click="navToDetailPage(item)">
				<image :src="item.properties.imgUrl"/>
			</swiper-item>
		</swiper>
		
	<!-- 	
		<view class="uni-flex uni-row">
			<view class="flex-item">
				<image src="/static/temp/c3.png"></image>
				<text>环球美食</text>
			</view>
			<view class="flex-item">
				<image src="/static/temp/c3.png"></image>
				<text>环球美食</text>
			</view>
			<view class="flex-item">
				<image src="/static/temp/c3.png"></image>
				<text>环球美食</text>
			</view>
		</view> -->
			<view class="uni-title uni-common-mt">
				flex-direction: row
				<text>\n横向布局</text>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item uni-bg-red">A</view>
				<view class="flex-item uni-bg-green">B</view>
				<view class="flex-item uni-bg-blue">C</view>
			</view>
			<view class="uni-title uni-common-mt">
				flex-direction: column
				<text>\n纵向布局</text>
			</view>
			<view class="uni-flex uni-column">
				<view class="flex-item flex-item-V uni-bg-red">A</view>
				<view class="flex-item flex-item-V uni-bg-green">B</view>
				<view class="flex-item flex-item-V uni-bg-blue">C</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner: [],

				indicatorDots: true,
				autoplay: true,
				circular: true,
				interval: 2000,
				duration: 500,
				datas: {}
			}
		},

		onLoad() {
			uni.showLoading({
				title: "加载中...."
			});
			uni.request({
				url: 'https://mtest.sinosafe.com.cn/pup/cmscenter/subject/webSubject?rn=202004021733&subjectCodes=zsb-app-advertisInfo,zsb-app-headerAdvInfos,zsb-app-bottomAdvInfos,zsb-app-new-bottomAdvInfos',
				method: 'GET',
				data: {},
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
			//banner图跳转链接
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let bannerUrl = item.properties.url;
				window.location.href = bannerUrl;
			}
		}
	}
</script>

<style lang="scss">

	.banner{
		height: 200px;
		width: 100%;
	}
	.banner uni-image {
	    width: 100%;
		height: 100%;
	}
	.flex-item {
		width: 33.3%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}
	.uni-row image{
		width: 60%;
		height: 80upx;
	}

	

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}
</style>
