<template>
	<view v-if="goodsInfo.goods_name">
		<swiper class="swiper-list" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goodsInfo.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-box">
			<view class="goods-box-price">￥{{goodsInfo.goods_price}}</view>
			<view class="goods-box-desc">
				<view class="name">{{goodsInfo.goods_name}}</view>
				<view class="collect">
					<uni-icons type="star" :size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-box-tip">快递: 免运费</view>
		</view>
		<view>
			<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		</view>
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {},
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}]
			};
		},
		onLoad(options) {
			const id = options.goods_id
			this.getGoodsDetail(id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g, 'jpg')
				this.goodsInfo = res.message
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				console.log('e', e)
			}
		}
	}
</script>

<style lang="scss">
.swiper-list {
	height: 750rpx;
	
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-box {
	padding: 10px;
	&-price {
		font-size: 18;
		color: #C00000;
		margin-bottom: 10px;
	}
	&-desc {
		display: flex;
		justify-content: space-between;
		.name {
			font-size: 13px;
			margin-right: 5px;
		}
		.collect {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #efefef;
			font-size: 12px;
			color: gray;
			width: 120px;
		}
	}
	&-tip {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}
.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
