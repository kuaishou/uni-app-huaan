<template>
	<view class="container">
		<!-- banner图 -->
		<view class="top-img">
			<image :src="this.productInfo.uiInfo.ACTIVITY_BANNER_PATH" mode=""></image>
		</view>
		<view class="product-type">
			<view class="tabs uni-flex uni-row">
				<view :class="tabIndex==index ? 'tab-item active' : 'tab-item'" v-for="(item,index) in  productInfo.planInfo" :key="index"
				 :flag="item.PLAN_CODE" :data-current="index" @click="ontabtap">
				 <text>{{item.PLAN_NAME}}</text>
				</view>
			</view>
		
			<view class="product-list">
				<view class="tab-container-header uni-flex uni-row">
					<view class="text" style="-webkit-flex: 1;flex: 1;">保障责任</view>
					<view class="text" style="width: 200rpx; text-align: right;">保障金额(元)</view>
				</view>
				<view :current="tabIndex" :class="tabIndex==index ? 'tab-container active' : 'tab-container'" v-for="(tab,index) in productInfo.planInfo" :key="index">

					<view class="tab-container-mid" v-for="(items, inde) in tab.KIND_DATA_LIST" :key="'info'+inde">
						<view class=" uni-flex uni-row" v-for="(item, index) in items.LIST" :key="'info1'+index">
							<view class="text" style="-webkit-flex: 1;flex: 1;">{{item.N_NAME}}</view>
							<view class="text" style="width: 200rpx; text-align: right;">{{item.N_AMT}}</view>
						</view>
					</view>
				</view>
				<view class="" v-for="(items,ind) in productInfo.quoteList" :key="'year'+ind">
					<view class="tab-container-footer uni-flex uni-row" v-for="(item, inde) in items.itemList" :key="inde">
						<view class="text" style="-webkit-flex: 1;flex: 1;">{{item.LABEL}}</view>
						<view class="text uni-list-cell-db" style="width: 200rpx; text-align: right;">
							<select>
								<option :value="index" v-for="(itemd,index) in JSON.parse(item.VALUE_LIMITS)" :key="index">{{itemd}}</option>
							</select>
						
						</view>
					</view>		
				</view>
				<!-- <view class="" v-for="(items, index) in productInfo.quoteList" :key="index">
					<view class="tab-container-footer uni-flex uni-row" v-for="(item, inde) in items.itemList" :key="inde">
						<view class="text" style="-webkit-flex: 1;flex: 1;">{{item.LABEL}}</view>
						<view class="text uni-list-cell-db" style="width: 200rpx; text-align: right;">
							<select>
								<option :value="index" v-for="(itemd,index) in JSON.parse(item.VALUE_LIMITS)" :key="index">{{itemd}}</option>
							</select>
						
						</view>
					</view>		
				</view> -->
			</view>
			
		</view>
		
	</view>
</template>

<script>
	//import share from '@/components/share';
	export default{
		data() {
			return {
				productInfo:{
					baseInfo:{},
					noticeInfo:[],
					nspFlag:"",
					planInfo:[],
					quoteList:[],
					resultCode:'',
					resultMsg:'',
					salesInfo:{},
					uiInfo:{}
				},
				option:{},
				baseurl:"",
				requestData:{},
				tabIndex:0,
			};
		},
		onLoad(options){
			this.option=options;
			let baseurl=this.$store.state.baseurl;
			let RequestData={
				"productId":options.productId,
				"isMulti":options.isMulti,
				"salesCode":options.salesCode,
				"issueChannel":options.issueChannel,
				"SALE_COUNT":options.SALE_COUNT,
			}
			
			uni.showLoading({
				title: "加载中...."
			});
		
			uni.request({
				url: baseurl+'/micro-plat/commonData/productInfo.do',
				method: 'POST',
				dataType: 'json',
				async: 'false',
				header: {
					'content-type': "application/x-www-form-urlencoded",
				},
				data: {
					requestData: JSON.stringify(RequestData)
				},
				success: res => {
					uni.hideLoading();
					this.productInfo = res.data;
					console.log(this.productInfo);
			
				}
			});
		
		},
		methods:{
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
			},
			
		},

	}
</script>

<style lang='scss'>
.top-img uni-image{
	width: 100%;
	height: 288upx;
	line-height: 0;
}
.product-list .tab-container{
	display: none;
}
.product-list .active{
	display: block;
}
.product-type{
	    border-radius: 8px;
	    border: 1px solid #ff3f61;
	    margin: 10px;
	    padding: 0;
		box-shadow: none;
		background: #fff;
		font-size: 14px;
}
.product-type .tabs {
    border-radius: 8px 8px 0 0;
    line-height: 40px;
    display: -moz-box;
    display: -webkit-box;
    display: box;
    box-pack: center;
    box-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
	padding: 0;
	margin: 0;
	line-height: 40px;
}
.product-type .tabs .tab-item {
    box-flex: 1;
    flex: 1 auto;
    list-style-type: none;
    text-align: center;
    height: 100%;
    font-size: 1.1em;
	    border: none;
	    border-bottom: 1px solid #ddd;
	    border-left: 1px solid #ddd;
	    margin-right: -1px;
}
.product-type .tabs .tab-item:first-child {
    border-radius: 8px 0 0 0;
    border-left: none;
}
.product-type .tabs .tab-item text{
	line-height: 40px;
}
.product-type .tabs .active{
	    background: #ff3f61;
	    border-bottom: 1px solid #fff;
		color: #fff;
}
.tab-container{
	padding: 2px 0;
	color: #666;
	font-size: 14px;
}
   
.tab-container-header{
	margin: 0;
	    padding: 8px 20px 8px 16px;
		margin-bottom: 8px;
	    border-bottom: 1px #ddd solid;
		color: #666;
}
.tab-container-mid{
	margin: 0;
	padding: 0px 20px 0px 16px;
	color: #666;
}
.tab-container-footer{
	padding: 0px 20px 0px 16px;
	padding-bottom: 2px;
	min-height: 30px;
}

</style>
