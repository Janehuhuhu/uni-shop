<template>
	<view class="goods-item">
		<!-- 左边区域 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<!-- 右边区域 -->
		<view class="goods-item-right">
			<view class="goods-item-name">{{goods.goods_name}}</view>
			<view class="goods-item-price">￥{{goods.goods_price | toFixed}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				defaultPic: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000602669097_1_200x200.jpg'
			};
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left {
		margin-right: 5px;
		image {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.goods-item-name {
			font-size: 13px;
		}
		.goods-item-price {
			font-size: 16px;
			color: #C00000;
		}
	}
}
</style>