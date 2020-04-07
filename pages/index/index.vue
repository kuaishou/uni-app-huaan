<template>
	<view>
		<!-- banner图 -->
		<swiper class="swiper banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval"
		 :duration="duration">
			<swiper-item v-for="(item,index) in banner" :key="index" @click="navToDetailPage(item.properties.url)">
				<image class="banner-img" :src="item.properties.imgUrl"/>
			</swiper-item>
		</swiper>
		

		<view class="flex-item tab-box" v-for="(item,index) in items" :key="index" @click="navToDetailPage(item.url)">
			<image class="tab-icon" :src="item.icon"></image>
			<text class="tab-name">{{item.name}}</text>
		</view>
		
		<navigator url="../noCar/noCar.vue?ms=MIT-H5&agentcode=110061543&deptCode=0110010101" hover-class="navigator-hover">
		        <button  @click="navTo('/pages/noCar/noCar?ms=MIT-H5&agentcode=110061543&deptCode=0110010101')" type="default">跳转到新页面</button>
		</navigator>
		<button  @click="navTOPage('/pages/noCar/noCar?ms=MIT-H5&agentcode=110061543&deptCode=0110010101')" type="default">跳转到新00页面</button>
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
				datas: {},
				items: [
				          {
				            id:1001,
				            name: '车险投保',
				            icon: '../../static/icon/zsbf_icon_zsbicon_chexiantoubao.png',
							url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/mit-config?SOURCE=index',
				           },
						   {
						     id:1002,
						     name: '续保跟进',
						     icon: '../../static/icon/zsbf_icon_zsbicon_xubaogenjin.gif',
						     url: 'https://mtest.sinosafe.com.cn/eb-web/dist/salesPerform/#/renewalFollow?salesCode=110061543&token=4954BF6C5EFF48DB8658F641EE8779AF&deptCode=0110010101&checkCertificateSwitch=&salesmanCname=李璐',
						    },
							{
							  id:1003,
							  name: '车险续保',
							  icon: '../../static/icon/zsbf_icon_zsbicon_chexianxubao.png',
							  url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/mit-config-renewal',
							 },
							 {
							   id:1004,
							   name: '我的业绩',
							   icon: '../../static/icon/zsbf_icon_zsbicon_wodeyeji.png',
							   url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/trackRecord?TYPE=CAR',
							  },
							  {
							    id:1005,
							    name: '非车投保',
							    icon: '../../static/icon/zsbf_icon_zsbicon_feichetoubao.png',
							    url: '../noCar/noCar.vue?ms=MIT-H5&agentcode=110061543&deptCode=0110010101',
							   },
							   {
							     id:1006,
							     name: '个人微店',
							     icon: '../../static/icon/zsbf_icon_zsbicon_gerenweidian.png',
							     url: 'https://mtest.sinosafe.com.cn/eb-web/pro/mircoShop/index.html?salesCode=110061543?salesmanCode=lilu2@sinosafe.com.cn',
							    },
								{
								  id:1007,
								  name: '激活卡',
								  icon: '../../static/icon/zsbf_icon_zsbicon_jihuoka.png',
								  url: 'https://mtest.sinosafe.com.cn/eb-web/pro/virtualcard/index.html?userId=6313baad-72b6-45d4-ba6c-d34c84467c6b&salesmanCname=李璐&deptCode=0110010101&employCode=110061543&phone=18319028332&salesmanCode=lilu2@sinosafe.com.cn&channelSource=zhanye',
								 },
								 {
								   id:1008,
								   name: '展业海报',
								   icon: '../../static/icon/zsbf_icon_zsbicon_zhanyehabao.png',
								   url: 'https://mtest.sinosafe.com.cn/shop/ydzz/index/?userName=李璐&userMobile=18319028332&salesCode=110061543',
								  },
								  {
								    id:1009,
								    name: '我的报价',
								    icon: '../../static/icon/zsbf_img_zsbicon_wodebaojia.png',
								    url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/draftsList2',
								   },
								   {
								     id:1010,
								     name: '查询进度',
								     icon: '../../static/icon/zsbf_icon_zsbicon_jinduchaxun.png',
								     url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/oderSetbacksList?PAGE_CHANNAL=LIST',
								    },
									{
									  id:1011,
									  name: '车险保单',
									  icon: '../../static/icon/zsbf_icon_zsbicon_chexianbaodan.png',
									  url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/policySearch',
									 },
									 {
									   id:1012,
									   name: '更多',
									   icon: '../../static/icon/zsbf_icon_zsbicon_more.png',
									   url: 'https://mtest.sinosafe.com.cn/eb-web/new-www/index.html#/tab/mit-icon-more',
									  }	  
						]
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
				/* let bannerUrl = item.properties.url; */
				window.location.href = item;
			},
			navTOPage(url){
				/* uni.navigateTo({
					url
				})  */
				uni.redirectTo({
				    url: url
				});
			}
		}
	}
</script>

<style lang="scss">

	.banner{
		height: 200px;
		width: 100%;
	}
	.banner .banner-img {
	    width: 100%;
		height: 100%;
	}
	.tab-box {
		width: 25%;
		display: inline-block;
		height: 100upx;
		padding: 40upx 0;
		text-align: center;
	}
	.tab-icon{
		display: inline-block;
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
	}
	.tab-name{
		display: block;
	}
	
</style>
