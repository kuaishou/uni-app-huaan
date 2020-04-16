<template>

	<view class="product">
		<view class="top-bar uni-flex uni-row">
			<view :class="tabIndex==index ? 'flex-item active' : 'flex-item'" v-for="(item,index) in product.productList" :key="index"
			 :flag="item.CATEGORY" :data-current="index" @click="ontabtap">
				{{item.NAME}}
			</view>
		</view>

		<view class="product-list">
			<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" @change="ontabchange">
				<swiper-item class="swiper-item" v-for="(tab,index1) in product.productList" :key="index1">
					<view class="list-box" v-for="(item, index) in tab.dataList" :key="index" @click="productDetal(item)">
						<image class="logo" :src="item.LOGO_URL"></image>
						<view class="list-deatl">
							<text class="title">{{item.PRODUCT_NAME}}</text>
							<text class="summary">{{item.SUMMARY}}</text>
							<text class="min-price">¥<text class="price-num">{{item.MIN_PRICE}}</text>起</text>
							<text class="sale-count">已售{{item.SALE_COUNT}}份</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
	        mapState,  
	        mapMutations  
	    } from 'vuex'; 
	export default {
		data() {
			return {
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
				option: {},
				product: {
					productList: [],
					resultCode: "",
					resultMsg: ""
				},
			}
		},
		onLoad(option) {
			let baseurl=this.$store.state.baseurl;
			console.log(option); //打印出上个页面传递的参数。
			this.option=option;

			uni.showLoading({
				title: "加载中...."
			});
			uni.request({
				url: baseurl+'/micro-plat/commonQuery/queryProductList',
				method: 'POST',
				dataType: 'jsonp', // 请求方式为jsonp
				header: {
					'content-type': "application/x-www-form-urlencoded; charset=UTF-8",
				},
				data: {
					issueChannel: 2,
					salesCode: option.agentcode,
					deptCode: option.deptCode
				},
				success: res => {
					uni.hideLoading();
					this.product = JSON.parse(res.data);
					console.log(this.product);

				}
			});
		},
		methods: {
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
			},
			productDetal(item) {
				let url = item.URL;
				let saleUrl="";
				if (url) {
					saleUrl = url + "?productId=" + item.PRODUCT_ID + "&isMulti=1&salesCode=" + this.option.agentcode + "&issueChannel=" + "2" +
						"&SALE_COUNT=" + item.SALE_COUNT;
				} else {
					saleUrl = "/pages/noCar/detail/detail?productId=" + item.PRODUCT_ID + "&isMulti=1&salesCode=" + this.option.agentcode +
						"&issueChannel=" + "2" + "&SALE_COUNT=" + item.SALE_COUNT;
				}

				if (item.system == 2) saleUrl += '&system=2';
				/* window.location.href = saleUrl; */
				uni.reLaunch({
				    url: saleUrl
				});
			}
		}
	}
</script>

<style lang="scss">
	.top-bar {
		height: 44px;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		padding: 0 8px;
		box-sizing: border-box;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 8px 0;
		box-sizing: content-box;
		z-index: 500;
		background: #f7f7f8;
	}

	.flex-item {
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		-ms-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		background: #fff;
		color: #010101;
		border-radius: 20px;
		font-size: 15px;
		text-align: center;
		padding: 2px 0;
		margin-left: 10px;
	}

	.uni-flex .active {
		background: #E13C38 !important;
		color: white !important;
	}

	.product {
		height: 100%;
		overflow: hidden;
	}

	.product-list {
		width: 100%;
		height: 100%;
		display: flex;
		overflow: scroll;
	}

	.product-list .swiper-box {
		height: 100%;
		padding-top: 60px;
		overflow: scroll;
	}

	.product .product-list uni-swiper uni-swiper-item {
		overflow: scroll;
	}

	uni-page-body {
		height: 100%;
	}

	.list-box {
		width: 100%;
		min-height: 96px;
		text-decoration: none;
		padding: 0 10px;
		margin: 10px 0;
		background-color: #FFFFFF;
	}

	.list-box .logo {
		float: left;
		height: 86px;
		margin: 5px;
		width: 86px;
	}

	.list-box .list-deatl .title {
		line-height: 100%;
		display: block;
		color: #111;
		font-weight: bold;
		font-size: 15px;
		padding: 5px;
		text-decoration: none;
	}

	.list-box .list-deatl .summary {
		display: block;
		color: rgba(102, 102, 102, 1);
		font-size: 13px;
		padding: 5px;
		text-decoration: none;
		line-height: 17px;
	}

	.list-box .list-deatl .min-price {
		display: inline-block;
		width: 35%;
		text-decoration: none;
		padding: 5px;
		font-size: 12px;
		color: rgba(244, 84, 72, 1);
		margin-top: -17px;
	}

	.list-box .list-deatl .min-price .price-num {
		font-size: 30px;
		font-weight: bold;
	}

	.list-box .list-deatl .sale-count {
		display: inline-block;
		width: 200upx;
		text-align: right;
		color: rgba(153, 153, 153, 1);
		font-size: 12px;
	}
</style>
