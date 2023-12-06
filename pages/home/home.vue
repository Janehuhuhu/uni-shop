<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>
		<view>
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-box">
					<navigator :url="item.product_list[0].url" class="left-floor-box">
						<image mode="widthFix" :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<view class="right-floor-box">
						<navigator v-for="(item2, index2) in item.product_list" :key="index2" :url="item2.url">
							<image v-if="index2 !== 0" mode="widthFix" :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				this.swiperList = res.message
			},
			async getNavList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				this.navList = res.message
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getFloorList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "数据请求失败",
						duration: 1500,
						icon: 'none'
					})
				}
				res.message.forEach(item => {
					item.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
	}
	.swiper-item, image {
		width: 100%;
		height: 100%;
	}
	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;
	}
	.nav-img {
		height: 140rpx;
		width: 128rpx;
	}
	.floor-item {
		margin: 30rpx 0 20rpx 10rpx;
	}
	.floor-title {
		height: 60rpx;
		width: 100%;
	}
	.floor-box {
		display: flex;
	}
	.right-floor-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
