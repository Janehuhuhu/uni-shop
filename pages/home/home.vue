<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
		onLoad() {
			console.log('sss')
			this.getSwiperList()
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
</style>
